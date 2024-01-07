function randomizeBars() {
    const bars = document.querySelectorAll('.bar');
    const values = Array.from({ length: bars.length }, () => Math.floor(Math.random() * 200) + 1);

    values.forEach((value, index) => {
        bars[index].style.height = `${value}px`;
    });
}

function changeSize(){
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        let currentHeight = parseInt(bar.style.height);
        let newHeight = currentHeight * 0.8; 
        bar.style.height = `${newHeight}px`;
    });
}

async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    for (let i = 1; i < bars.length; i++) {
        let key = bars[i].style.height;
        let j = i - 1;
        while (j >= 0 && parseInt(bars[j].style.height) > parseInt(key)) {
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
            await sleep(100); 
        }
        bars[j + 1].style.height = key;
    }
}

async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                // Swap bars
                let temp = bars[j].style.height;
                bars[j].style.height = bars[j + 1].style.height;
                bars[j + 1].style.height = temp;
                await sleep(100); 
            }
        }
    }
}

async function quickSort() {
    const bars = document.querySelectorAll('.bar');
    await performQuickSort(bars, 0, bars.length - 1);
}

async function performQuickSort(bars, low, high) {
    if (low < high) {
        const pivotIndex = await partition(bars, low, high);
        await Promise.all([
            performQuickSort(bars, low, pivotIndex - 1),
            performQuickSort(bars, pivotIndex + 1, high)
        ]);
    }
}

async function partition(bars, low, high) {
    const pivot = parseInt(bars[high].style.height);
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            await swap(bars, i, j);
        }
    }

    await swap(bars, i + 1, high);
    return i + 1;
}

async function mergeSort() {
    const bars = document.querySelectorAll('.bar');
    const heights = Array.from(bars).map(bar => parseInt(bar.style.height));
    await performMergeSort(bars, heights, 0, bars.length - 1);
}

async function performMergeSort(bars, heights, low, high) {
    if (low < high) {
        const mid = Math.floor((low + high) / 2);
        await Promise.all([
            performMergeSort(bars, heights, low, mid),
            performMergeSort(bars, heights, mid + 1, high),
            merge(bars, heights, low, mid, high)
        ]);
    }
}

async function merge(bars, heights, low, mid, high) {
    const left = heights.slice(low, mid + 1);
    const right = heights.slice(mid + 1, high + 1);

    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            bars[k].style.height = `${left[i]}px`;
            i++;
        } else {
            bars[k].style.height = `${right[j]}px`;
            j++;
        }
        k++;
        await sleep(100); 
    }

    while (i < left.length) {
        bars[k].style.height = `${left[i]}px`;
        i++;
        k++;
        await sleep(100); 
    }

    while (j < right.length) {
        bars[k].style.height = `${right[j]}px`;
        j++;
        k++;
        await sleep(100); 
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function shellSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = parseInt(bars[i].style.height);
            let j = i;
            while (j >= gap && parseInt(bars[j - gap].style.height) > temp) {
                bars[j].style.height = bars[j - gap].style.height;
                j -= gap;
                await sleep(100); 
            }
            bars[j].style.height = `${temp}px`;
        }
    }
}

async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
        }
        await swap(bars, i, minIndex);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function swap(bars, i, j) {
    const temp = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = temp;
    await sleep(100); 

}
randomizeBars();
