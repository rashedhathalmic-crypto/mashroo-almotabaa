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

    latestOrders.innerHTML = "";

    snapshot.forEach((doc) => {

        const order = doc.data();

        switch(order.status){

            case "جديد":
                newCount++;
                break;

            case "تحت الإنتاج":
                productionCount++;
                break;

            case "QC":
                qcCount++;
                break;

            case "تم التسليم":
                finishedCount++;
                break;

        }

        latestOrders.innerHTML += `
        <tr>
            <td>${order.customer}</td>
            <td>${order.glassType}</td>
            <td>${order.width}</td>
            <td>${order.height}</td>
            <td>${order.qty}</td>
            <td>${order.status}</td>
        </tr>
        `;

    });

    newOrders.textContent = newCount;
    productionOrders.textContent = productionCount;
    qcOrders.textContent = qcCount;
    finishedOrders.textContent = finishedCount;

}

loadDashboard();
