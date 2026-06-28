import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const stages = [
    "استلام",
    "قص",
    "تجليخ",
    "غسيل",
    "Lamination",
    "Autoclave",
    "QC",
    "تغليف",
    "تسليم"
];

let order = {};

async function loadOrder() {

    if (!id) return;

    const ref = doc(db, "orders", id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        alert("أمر الإنتاج غير موجود");
        return;
    }

    order = snap.data();

    document.getElementById("orderNo").textContent = order.orderNo || "-";
    document.getElementById("customer").textContent = order.customer || "-";
    document.getElementById("project").textContent = order.project || "-";
    document.getElementById("drawingNo").textContent = order.drawingNo || "-";
    document.getElementById("partNo").textContent = order.partNo || "-";
    document.getElementById("glassType").textContent = order.glassType || "-";
    document.getElementById("thickness").textContent = order.thickness || "-";
    document.getElementById("width").textContent = order.width || "-";
    document.getElementById("height").textContent = order.height || "-";
    document.getElementById("qty").textContent = order.qty || "-";
    document.getElementById("priority").textContent = order.priority || "-";
    document.getElementById("status").textContent = order.status || "-";

    if (document.getElementById("lastUpdate")) {
        document.getElementById("lastUpdate").textContent =
            order.lastUpdate || "-";
    }

    updateScreen();
    loadHistory();
}

function updateScreen() {

    const stage = order.stage || "استلام";
    const progress = order.progress || 0;

    document.getElementById("progressBar").value = progress;
    document.getElementById("progressText").textContent = progress + "%";

    stages.forEach((name, index) => {

        const item = document.getElementById("s" + (index + 1));

        if (!item) return;

        if (index < stages.indexOf(stage)) {
            item.innerHTML = "✅ " + name;
        } else if (name === stage) {
            item.innerHTML = "🟢 " + name;
        } else {
            item.innerHTML = "⚪ " + name;
        }

    });

}

function loadHistory() {

    const tbody = document.querySelector("#historyTable tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const history = order.history || [];

    history.forEach(item => {

        tbody.innerHTML += `
        <tr>
            <td>${item.stage}</td>
            <td>${item.time}</td>
        </tr>
        `;

    });

}

document.getElementById("nextStage").addEventListener("click", async () => {

    const current = stages.indexOf(order.stage || "استلام");

    if (current === stages.length - 1) {

        alert("تم إنهاء جميع مراحل الإنتاج");
        return;

    }

    const next = current + 1;

    order.stage = stages[next];

    order.progress = Math.round((next / (stages.length - 1)) * 100);

    if (next === stages.length - 1) {
        order.status = "مكتمل";
    } else {
        order.status = "قيد الإنتاج";
    }

    const now = new Date().toLocaleString("ar-SA");

    await updateDoc(doc(db, "orders", id), {

        stage: order.stage,
        progress: order.progress,
        status: order.status,
        lastUpdate: now,

        history: arrayUnion({
            stage: order.stage,
            time: now
        })

    });

    order.lastUpdate = now;

    if (!order.history) {
        order.history = [];
    }

    order.history.push({
        stage: order.stage,
        time: now
    });
document.getElementById("status").textContent = order.status;

if (document.getElementById("lastUpdate")) {
    document.getElementById("lastUpdate").textContent = now;
}

await loadOrder();

alert("تم تحديث المرحلة إلى: " + order.stage);

});

loadOrder();
