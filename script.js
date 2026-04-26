document.addEventListener("DOMContentLoaded", () => {
    const ROWS = 10;

    const inputBody  = document.getElementById("inputBody");
    const outputBody = document.getElementById("outputBody");
    const sortBtn    = document.getElementById("sortBtn");

    /* ── Генерируем 10 строк с полями ввода ── */
    for (let i = 1; i <= ROWS; i++) {
        const tr = document.createElement("tr");

        const tdIndex = document.createElement("td");
        tdIndex.textContent = i;
        tdIndex.style.textAlign = "center";

        const tdInput = document.createElement("td");
        const input   = document.createElement("input");
        input.type    = "number";
        input.step    = "any";
        input.placeholder = "Введите число";
        input.dataset.row = i;          // запоминаем номер
        tdInput.appendChild(input);

        tr.appendChild(tdIndex);
        tr.appendChild(tdInput);
        inputBody.appendChild(tr);
    }

    /* ── Алгоритм сортировки (слиянием / merge sort) ── */
    function mergeSort(arr) {
        if (arr.length <= 1) return arr;

        const mid   = Math.floor(arr.length / 2);
        const left  = mergeSort(arr.slice(0, mid));
        const right = mergeSort(arr.slice(mid));

        return merge(left, right);
    }

    function merge(left, right) {
        const result = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        // докидываем остатки
        return result.concat(left.slice(i)).concat(right.slice(j));
    }

    /* ── Обработчик кнопки ── */
    sortBtn.addEventListener("click", () => {
        const inputs = inputBody.querySelectorAll("input");
        const numbers = [];

        // Собираем числа, пропуская пустые
        inputs.forEach((inp) => {
            const val = inp.value.trim();
            if (val !== "") {
                numbers.push(Number(val));
            }
        });

        if (numbers.length === 0) {
            outputBody.innerHTML = `
                <tr>
                    <td colspan="2" style="color:#f87171;">
                        Введите хотя бы одно число
                    </td>
                </tr>`;
            return;
        }

        // Сортируем
        const sorted = mergeSort(numbers);

        // Рисуем таблицу
        outputBody.innerHTML = "";
        sorted.forEach((num, idx) => {
            const tr = document.createElement("tr");
            tr.style.animationDelay = `${idx * 0.05}s`;

            const tdIdx   = document.createElement("td");
            tdIdx.className = "index-col";
            tdIdx.textContent = idx + 1;

            const tdVal   = document.createElement("td");
            tdVal.className = "value-col";
            tdVal.textContent = num;

            tr.appendChild(tdIdx);
            tr.appendChild(tdVal);
            outputBody.appendChild(tr);
        });
    });
});