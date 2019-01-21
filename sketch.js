let arrOfArrs = []

let heapsortVars = []

let mergesortVars = []

let bubblesortVars = []
let boggosortVars = []
let insertsortVars = []
let sizePerElement;

let showComplexity = true;
const speed = 1;
const numberOfElements = 100;
const spaceBetweenElements = 0.5;
const avgArray = ["O(n log n) avg.", "O(n log n) avg.","O(n^2) avg.","O(n^2) avg.","O((n+1)!) avg."];
const nameArray = ["heap sort", "merge sort", "insertion sort", "bubble sort", "boggo sort"];

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    sizePerElement = width / numberOfElements;
    let myArray = [];
    for(let x = 0; x < floor(width / sizePerElement); x++) {
        //let r = noise(x * 0.01);
        let r = random(1);
        //r = pow(r, 2);
        myArray.push(r);
    }
    for(let x = 0; x < 5; x++) {
        arrOfArrs.push(myArray.slice());
    }
    
    heapsort_init(arrOfArrs[0]);
    merge_sort_init();
    insertion_sort_init(arrOfArrs[2])
    bubble_sort_init(arrOfArrs[3]);
    boggosort_init();
    
    colorMode(HSB, 255);
    frameRate(60);
}
function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 20);
    
    sizePerElement = width / numberOfElements;
}
function draw() {
    background(0);

    for(let x = 0; x < speed; x++) {
        heapsort_step(arrOfArrs[0]);
        merge_sort_step(arrOfArrs[1]);
        insertion_sort_step(arrOfArrs[2])
        bubble_sort_step(arrOfArrs[3]);
        if(arrOfArrs.length > 4) {
            boggosort_step(arrOfArrs[4]);
        }
    }
    let heightPerArray = height / arrOfArrs.length;
    noStroke();
    for(let y = 0; y < arrOfArrs.length; y++) {
        let myArray = arrOfArrs[y];
        
        let startY = heightPerArray * y;
        
        for(let x = 0; x < myArray.length; x++) {
            let value = myArray[x];
            fill(value * 210 - 20, 255, 255);
            let posx = x * sizePerElement;
            let posy = height - (startY + heightPerArray * value);
            rect(posx, posy, sizePerElement - spaceBetweenElements, value * heightPerArray);
        }
        fill(0,0,255);
        text(nameArray[y], 5, height - startY - heightPerArray + 15);
        if(showComplexity) {
            fill(0,0,150);
            text(avgArray[y], 100, height - startY - heightPerArray + 15);
        }
    }
}

function insertion_sort_init(arr) {
    insertsortVars.push(1);
    insertsortVars.push(0);
    insertsortVars.push(arr[0]);
}

function insertion_sort_step(arr) {
    if(insertsortVars[0] <= arr.length) {
        if(insertsortVars[1] > -1 && arr[insertsortVars[1]] > insertsortVars[2]) {
            swapArr(arr, insertsortVars[1] + 1, insertsortVars[1]);
            insertsortVars[1] -= 1;
        } else {
            let newValueIndex = insertsortVars[1] + 1;
            insertsortVars[1] = insertsortVars[0];
            insertsortVars[0] += 1;
            let temp = arr[insertsortVars[0]];
            arr[newValueIndex] = insertsortVars[2];
            insertsortVars[2] = temp;
        }
    }
}

function shuffle_step(arr) {
    let a = floor(random(arr.length));
    let b = floor(random(arr.length));
    swapArr(arr, a, b);
}
function boggosort_init() {
    boggosortVars.push(true);
}
function boggosort_step(arr) {
    if(boggosortVars[0]) {
        shuffle_step(arr);
        let sorted = true;
        for(let i = 0; i < arr.length - 1; i++) {
            if(arr[i] > arr[i + 1]) {
                sorted = false;
            }
        }
        if(sorted) {
            boggosortVars[0] = false;
        }
    }
}


function swapArr(arr, a, b) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
}

function heap_sort_parent(x) {
    return floor((x-1) / 2);
}
function heap_sort_left_child(x) {
    return 2 * x + 1;
}

function siftDown(arr, start, end) {
    //let root = heapsortVars[2];
    
    if (heap_sort_left_child(heapsortVars[2]) <= end) {
        let child = heap_sort_left_child(heapsortVars[2]);
        let toSwap = heapsortVars[2];
        
        if(arr[toSwap] < arr[child]){
            toSwap = child;
        }
        if(child + 1 <= end && arr[toSwap] < arr[child + 1]) {
            toSwap = child + 1;
        }
        if(toSwap == heapsortVars[2]) {
            if(heapsortVars[0] >= 0) {
                heapsortVars[0] -= 1;
                heapsortVars[2] = heapsortVars[0];
            } else {
                heapsortVars[3] = 1;
            }
            return
        } else {
            swapArr(arr, heapsortVars[2], toSwap);
            heapsortVars[2] = toSwap;
        }
    } else {
        if(heapsortVars[0] >= 0) {
            heapsortVars[0] -= 1;
            heapsortVars[2] = heapsortVars[0];
        } else {
            heapsortVars[3] = 1;
        }
    }
}

function heapsort_init(arr) {
    /*i = arr.length - 1;
    j = heap_sort_parent(i);*/
    let l = arr.length - 1;
    heapsortVars.push(heap_sort_parent(l));
    heapsortVars.push(l);
    heapsortVars.push(heap_sort_parent(l));
    heapsortVars.push(0);
}


function heapsort_step(arr) {
    if(heapsortVars[0] >= 0) {
        siftDown(arr, heapsortVars[0], arr.length - 1);
        //heapsortVars[0] -= 1;
    } else if(heapsortVars[1] > 0) {
        if(heapsortVars[3] == 1) {
            swapArr(arr, 0, heapsortVars[1]);
            heapsortVars[1] -= 1;
            heapsortVars[2] = 0;
            heapsortVars[3] = 0;
        } else {
            siftDown(arr, 0, heapsortVars[1]);
        }
    }
}


function merge(arr, start, middle, end) {
    if(mergesortVars[2].length < 1) {
        //let tempArr = []
        let c1 = start;
        let c2 = middle + 1;

        while(c1 <= middle && c2 <= end) {
            let smallest = (arr[c1] <= arr[c2]) ? arr[c1++] : arr[c2++];
            mergesortVars[2].push(smallest);
        }
        while(c1 <= middle) {
            mergesortVars[2].push(arr[c1++]);
        }
        while(c2 <= end) {
            mergesortVars[2].push(arr[c2++]);
        }
    } else {
        if(mergesortVars[3] < mergesortVars[2].length) {
            arr[start + mergesortVars[3]] = mergesortVars[2][mergesortVars[3]];
            mergesortVars[3] += 1;
        } else {
            mergesortVars[1] += (2 * mergesortVars[0]);
            mergesortVars[2] = [];
            mergesortVars[3] = 0;
        }
    }
}

function merge_sort_init() {
    /*j = 1;
    i = 0;*/
    mergesortVars.push(1);
    mergesortVars.push(0);
    mergesortVars.push([]);
    mergesortVars.push(0);
    
}

function merge_sort_step(arr) {
    let last = arr.length - 1;
    let j = mergesortVars[0];
    let i = mergesortVars[1];
    if(j <= last) {
        if(i <= last - j) {
            let middle = min(i + j - 1, last);
            let right = min((i + 2 * j) - 1, last);
            merge(arr, i, middle, right);
            //mergesortVars[1] += (2 * j);
        } else {
            mergesortVars[1] = 0;
            mergesortVars[0] *= 2;
        }
    }
}

function bubble_sort_init(arr) {
    bubblesortVars.push(arr.length - 1);
    bubblesortVars.push(0);
}

function bubble_sort_step(arr) {
    let j = bubblesortVars[0];
    let i = bubblesortVars[1];
    if (j > 0) {
        if (i < j) {
            if (arr[i] > arr[i + 1]) {
                swapArr(arr, i, i + 1);
            }
            bubblesortVars[1] = i + 1;
        } else {
            bubblesortVars[1] = 0;
            bubblesortVars[0] -= 1;
        }
    }
}

