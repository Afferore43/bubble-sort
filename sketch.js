var arr = []

var j;
var i;
var speed = 1;
var sizePerElement = 20;

/*
*BubbleSort(int *arr)
    for(int j = len(a) - 1; j > 0; j++) {
        for(int i = 0; i < j; i++) {
            if (arr[i] > arr[i + 1]) {
                swap(i, i + 1);
            }
        }
    }
*/

function setup() {
    createCanvas(windowWidth - 50, windowHeight - 50);
    for(let x = 0; x < width / sizePerElement; x++) {
        //let n = noise(x) * height;
        let r = random(height);
        arr.push(r);
    }
    j = arr.length - 1;
    i = 0.0;
    colorMode(HSB, 255);
    frameRate(30);
}


function swap(a,b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function draw() {
    background(0);

    for(var x = 0; x < speed; x++) {
        if (j > 0) {
            if (i < j) {
                if (arr[i] > arr[i + 1]) {
                    swap(i, i + 1);
                }
                i = i + 1;
            } else {
                i = 0;
                j -= 1;
            }
        }
    }
    for(let x = 0; x < arr.length; x++) {
        noStroke();
        if (j > 0 && (x == i || x == i + 1)) {
            strokeWeight(3);
            stroke(0,0,255);
        }
        
        fill((arr[x] / height) * 200 - 20, 255, 255);
        rect(x * sizePerElement, height - arr[x], sizePerElement - 2, arr[x]);
    }
    if(j > 0) {
        strokeWeight(2);
        stroke((arr[j + 1] / height) * 200 - 20, 255, 255);
        line(0, height - arr[j + 1], width, height - arr[j + 1]);

        stroke((arr[i] / height) * 200 - 20, 255, 255);
        line(0, height - arr[i], width, height - arr[i]);
    }
}
