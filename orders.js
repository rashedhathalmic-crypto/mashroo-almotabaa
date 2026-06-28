import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const tbody = document.querySelector("#ordersTable tbody");

async function loadOrders() {

    tbody.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "orders"));

    querySnapshot.forEach((doc) => {

        const order = doc.data();

        tbody.innerHTML += `
        <tr>

            <td>${order.orderNo || "-"}</td>

            <td>${order.customer}</td>

            <td>${order.glassType}</td>

            <td>${order.width}</td>

            <td>${order.height}</td>

            <td>${order.qty}</td>

            <td>${order.status}</td>

            <td>
                <a class="btn" href="order-details.html?id=${doc.id}">
                    👁️ عرض
                </a>
            </td>

        </tr>
        `;

    });

}

loadOrders();
