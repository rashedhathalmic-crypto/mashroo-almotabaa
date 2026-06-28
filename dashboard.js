import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const newOrders = document.getElementById("newOrders");
const productionOrders = document.getElementById("productionOrders");
const qcOrders = document.getElementById("qcOrders");
const finishedOrders = document.getElementById("finishedOrders");

const latestOrders = document.getElementById("latestOrders");

async function loadDashboard() {

    const snapshot = await getDocs(collection(db, "orders"));

    let newCount = 0;
    let productionCount = 0;
    let qcCount = 0;
    let finishedCount = 0;

    const orders = [];

    snapshot.forEach((docSnap) => {

        const order = docSnap.data();

        orders.push(order);

        switch (order.status) {

            case "جديد":
                newCount++;
                break;

            case "قيد الإنتاج":
                productionCount++;
                break;

            case "QC":
                qcCount++;
                break;

            case "مكتمل":
            case "تم التسليم":
                finishedCount++;
                break;

        }

    });

    newOrders.textContent = newCount;
    productionOrders.textContent = productionCount;
    qcOrders.textContent = qcCount;
    finishedOrders.textContent = finishedCount;

    latestOrders.innerHTML = "";

    orders
        .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
        .slice(0, 10)
        .forEach(order => {

            latestOrders.innerHTML += `
            <tr>

                <td>${order.customer || "-"}</td>

                <td>${order.glassType || "-"}</td>

                <td>${order.width || "-"}</td>

                <td>${order.height || "-"}</td>

                <td>${order.qty || "-"}</td>

                <td>${order.status || "-"}</td>

            </tr>
            `;

        });

    if (orders.length === 0) {

        latestOrders.innerHTML = `
        <tr>
            <td colspan="6">
                لا توجد أوامر إنتاج
            </td>
        </tr>
        `;

    }

}

loadDashboard();
