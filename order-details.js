import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    updateDoc
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

    updateScreen();
}

function updateScreen(){

    const stage = order.stage || "استلام";

    const progress = order.progress || 0;

    document.getElementById("progressBar").value = progress;
    document.getElementById("progressText").textContent = progress + "%";

    stages.forEach((name,index)=>{

        const item=document.getElementById("s"+(index+1));

        if(index < stages.indexOf(stage)){
            item.innerHTML="✅ "+name;
        }
        else if(name===stage){
            item.innerHTML="🟢 "+name;
        }
        else{
            item.innerHTML="⚪ "+name;
        }

    });

}

document.getElementById("nextStage").addEventListener("click",async()=>{

    const current = stages.indexOf(order.stage || "استلام");

    if(current===stages.length-1){

        alert("تم إنهاء جميع مراحل الإنتاج");

        return;

    }

    const next=current+1;

    order.stage=stages[next];

    order.progress=Math.round(((next)/(stages.length-1))*100);

    if(next===stages.length-1){
        order.status="مكتمل";
    }else{
        order.status="قيد الإنتاج";
    }

    await updateDoc(doc(db,"orders",id),{

        stage:order.stage,

        progress:order.progress,

        status:order.status

    });

    document.getElementById("status").textContent=order.status;

    updateScreen();

    alert("تم تحديث المرحلة إلى : "+order.stage);

});

loadOrder();
