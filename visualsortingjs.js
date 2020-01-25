var randomizeBtn=document.getElementById("randomizebtn");
var bubbleSortBtn=document.getElementById("bubblesort");
var selectionSortBtn=document.getElementById("selectionsort");
var quickSortBtn=document.getElementById("quicksort");
var mergeSortBtn=document.getElementById("mergesort");
var goBtn=document.getElementById("gobtn");
var finishFlag=0;

var currentSelection=0; //1-Bubble Sort , 2-Selection Sort , 3-Quick Sort , 4-Merge Sort
var chart=startAll();

function startAll() {

    chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Visual Sorting"
        },
        axisY: {
            title: "Value",
            suffix: "",
            minimum: 0,
            maximum:120
        },
        data: [{
            type: "column",	
            yValueFormatString: "#,###",
            indexLabel: "{y}",
            dataPoints: [
                { x:0 , y: 100 , color: "blue" },{ x:1 , y: 100 , color: "blue" },{ x:2 , y: 100 , color: "blue" },{ x:3 , y: 100 , color: "blue" },{ x:4 , y: 100 , color: "blue" },{ x:5 , y: 100 , color: "blue" },
                { x:6 , y: 100 , color: "blue" },{ x:7 , y: 100 , color: "blue" },{ x:8 , y: 100 , color: "blue" },{ x:9 , y: 100 , color: "blue" },{ x:10 , y: 100 , color: "blue" },{ x:11 , y: 100 , color: "blue" },
                { x:12 , y: 100 , color: "blue" },{ x:13 , y: 100 , color: "blue" },{ x:14 , y: 100 , color: "blue" },{ x:15 , y: 100 , color: "blue" },{ x:16 , y: 100 , color: "blue" },{ x:17 , y: 100 , color: "blue" },
                { x:18 , y: 100 , color: "blue" },{ x:19 , y: 100 , color: "blue" },{ x:20 , y: 100 , color: "blue" },{ x:21 , y: 100 , color: "blue" },{ x:22 , y: 100 , color: "blue" },{ x:23 , y: 100 , color: "blue" },
                { x:24 , y: 100 , color: "blue" },{ x:25 , y: 100 , color: "blue" },{ x:26 , y: 100 , color: "blue" },{ x:27 , y: 100 , color: "blue" },{ x:28 , y: 100 , color: "blue" },{ x:29 , y: 100 , color: "blue" },
                { x:30 , y: 100 , color: "blue" },{ x:31 , y: 100 , color: "blue" },{ x:32 , y: 100 , color: "blue" },{ x:33 , y: 100 , color: "blue" },{ x:34 , y: 100 , color: "blue" },{ x:35 , y: 100 , color: "blue" }
            ]
        }]
    });
    this.randomizeChart();
    function updateChart() {
        var dps = chart.options.data[0].dataPoints;
        chart.options.data[0].dataPoints = dps; 
        chart.render();
    };
    updateChart();
    setInterval(function() {updateChart()}, 50);

    return chart;
}

addListeners();

function addListeners(){
    randomizeBtn.addEventListener('click',randomizeChart);
    bubbleSortBtn.addEventListener('click',buttonSelect);
    selectionSortBtn.addEventListener('click',buttonSelect);
    quickSortBtn.addEventListener('click',buttonSelect);
    mergeSortBtn.addEventListener('click',buttonSelect);
    goBtn.addEventListener('click',goPress);
}

function buttonSelect(){
    if(this.id=="bubblesort")
    {
        if(bubbleSortBtn.classList.contains("pressed"))
        {
            bubbleSortBtn.classList.remove("pressed");
            currentSelection=0;
        }else
        {
            selectionSortBtn.classList.remove("pressed");
            quickSortBtn.classList.remove("pressed");
            mergeSortBtn.classList.remove("pressed");
            bubbleSortBtn.classList.add("pressed");
            currentSelection=1;
        }
    }
    if(this.id=="selectionsort")
    {
        if(selectionSortBtn.classList.contains("pressed"))
        {
            selectionSortBtn.classList.remove("pressed");
            currentSelection=0;
        }else
        {
            selectionSortBtn.classList.add("pressed");
            quickSortBtn.classList.remove("pressed");
            mergeSortBtn.classList.remove("pressed");
            bubbleSortBtn.classList.remove("pressed");
            currentSelection=2;
        }
    }
    if(this.id=="quicksort")
    {
        if(quickSortBtn.classList.contains("pressed"))
        {
            quickSortBtn.classList.remove("pressed");
            currentSelection=0;
        }else
        {
            selectionSortBtn.classList.remove("pressed");
            quickSortBtn.classList.add("pressed");
            mergeSortBtn.classList.remove("pressed");
            bubbleSortBtn.classList.remove("pressed");
            currentSelection=3;
        }
    }
    if(this.id=="mergesort")
    {
        if(mergeSortBtn.classList.contains("pressed"))
        {
            mergeSortBtn.classList.remove("pressed");
            currentSelection=0;
        }else
        {
            selectionSortBtn.classList.remove("pressed");
            quickSortBtn.classList.remove("pressed");
            mergeSortBtn.classList.add("pressed");
            bubbleSortBtn.classList.remove("pressed");
            currentSelection=4;
        }
    }
}

function removeListeners(){
    randomizeBtn.removeEventListener('click',randomizeChart);
    bubbleSortBtn.removeEventListener('click',buttonSelect);
    selectionSortBtn.removeEventListener('click',buttonSelect);
    quickSortBtn.removeEventListener('click',buttonSelect);
    mergeSortBtn.removeEventListener('click',buttonSelect);
    goBtn.removeEventListener('click',goPress);
}

function randomizeChart(){
    var dps=chart.options.data[0].dataPoints;
    var len=dps.length;
    for (var i = 0; i < len; i++)
    {
        dps[i].y=Math.floor(Math.random() * 100);
        dps[i].color="blue";
    }    
    chart.options.data[0].dataPoints = dps; 
    finishFlag=0;
}

async function goPress(){
    if(currentSelection==0)
    {
        alert("Please select one of the sorting methods.\nBubble Sort , Selection Sort , Quick Sort or Merge Sort");
    }
    if(currentSelection==1)
    {
        if(finishFlag==1)
        {
            randomizeChart();
        }
        goBtn.innerHTML="Please Wait";
        goBtn.style.background="red";
        removeListeners();
        bubbleSort();
    }
    if(currentSelection==2)
    {
        if(finishFlag==1)
        {
            randomizeChart();
        }
        goBtn.innerHTML="Please Wait";
        goBtn.style.background="red";
        removeListeners();
        selectionSort();
    }
    if(currentSelection==3)
    {
        if(finishFlag==1)
        {
            randomizeChart();
        }
        var arr=chart.options.data[0].dataPoints;
        goBtn.innerHTML="Please Wait";
        goBtn.style.background="red";
        removeListeners();
        await quickSortHoare(arr,0,arr.length-1);
        goBtn.innerHTML="GO!";
        goBtn.style.background="green";
        finishFlag=1;
        addListeners();
    }
    if(currentSelection==4)
    {
        if(finishFlag==1)
        {
            randomizeChart();
        }
        var arr=chart.options.data[0].dataPoints;
        goBtn.innerHTML="Please Wait";
        goBtn.style.background="red";
        removeListeners();
        await mergeSort(arr,0,arr.length-1);
        goBtn.innerHTML="GO!";
        goBtn.style.background="green";
        finishFlag=1;
        addListeners();
    }
}

// ------------------------------------------------------- Bubble Sort Implementation -----------------------------------------------------
async function bubbleSort() {
    var arr=chart.options.data[0].dataPoints;
    for(var i=0;i<arr.length-1;i++)
    {
        for(var j=0;j<arr.length-i-1;j++)
        {
            arr[j].color="red";
            if(arr[j].y>arr[j+1].y)
            {
                var temp=arr[j].y;
                await sleep(20);
                arr[j].y = arr[j + 1].y; 
                arr[j + 1].y = temp;
            }
            await sleep(20);
            if(arr[j].color=="red")
            {
                arr[j].color="blue";
            }
        }
        arr[j].color="green";
    }
    arr[0].color="green";
    addListeners();
    goBtn.innerHTML="GO!";
    goBtn.style.background="green";
    finishFlag=1;
}

// ------------------------------------------------------- Selection Sort Implementation -----------------------------------------------------
async function selectionSort()
{
    var arr=chart.options.data[0].dataPoints;
    var candidate,second;
    for(var i=0;i<arr.length-1;i++)
    {
        var minIndex=i;
        for(var j=i+1;j<arr.length;j++)
        {
            arr[j].color="red";
            if(arr[j].y<arr[minIndex].y){
                if(candidate!=null)
                {
                    candidate.color="blue";
                }
                candidate=arr[j];
                arr[j].color="yellow";
                minIndex=j;
                await sleep(20);
            }
            await sleep(20);
            if(arr[j].color=="red")
            {
                arr[j].color="blue";
            }
        }
        var temp=arr[minIndex].y;
        arr[minIndex].y=arr[i].y;
        arr[i].y=temp;
        arr[i].color="green";
        for(var k=0;k<i;k++)
        {
            arr[k].color="green";
        }
        console.log("now "+i);
        await sleep(30);
    }
    arr[arr.length-1].color="green";
    addListeners();
    goBtn.innerHTML="GO!";
    goBtn.style.background="green";
    finishFlag=1;
}

// ------------------------------------------------------- Quick Sort Implementation -----------------------------------------------------

async function quickSortHoare(arr,low,high)
{
    if(low<high)
    {
        var par= await partitionHoare(arr,low,high);

        await Promise.all([quickSortHoare(arr,low,par),
        quickSortHoare(arr,par+1,high)]);
    }
    if(low>=high)
    {
        arr[low].color="green";
        arr[high].color="green";
    }
}

async function partitionHoare(arr,low,high)
{
    var pivot=arr[low].y;
    var i=low-1,j=high+1;
    arr[low].color="yellow";
    arr[high].color="yellow";
    while(true)
    {
        do{
            i++;
            if(arr[i].color!="yellow") {arr[i].color="red";}
            await sleep(50);
            if(arr[i].color!="yellow") {arr[i].color="blue";}
        }while(arr[i].y<pivot);
        do{
            j--;
            if(arr[j].color!="yellow") {arr[j].color="red";}
            await sleep(50)
            if(arr[j].color!="yellow") {arr[j].color="blue";}
        }while(arr[j].y>pivot);
        if(i>=j){
            return j;
        }
        var temp=arr[i].y;
        arr[i].y=arr[j].y;
        arr[j].y=temp;
        await sleep(50);
    }
}

//-----------------------------------------------------------Merge Sort Implementation---------------------------------------------------

async function merge(arr,left,mid,right){
    var subArr1=mid-left+1;
    var subArr2=right-mid;
    var larr=Array.from({length:subArr1});
    var rarr=Array.from({length:subArr2});

    arr[left].color="yellow";
    arr[right].color="yellow";

    for(var i=0;i<subArr1;i++)
    {
        larr[i]=arr[left+i].y;
    }
    for(var j=0;j<subArr2;j++)
    {
        rarr[j]=arr[mid+j+1].y;
    }

    var i=0,j=0,k=left,temp=0;

    while(i<subArr1 && j<subArr2)
    {
        temp=k;
        if(arr[k].color!="yellow") {arr[k].color="red";}
        if(larr[i]<=rarr[j])
        {
            arr[k].y=larr[i];
            i++;
        }
        else{
            arr[k].y=rarr[j];
            j++;
        }
        await sleep(50);
        k++;
        if(arr[temp].color!="yellow") {arr[temp].color="blue";}
        if(left==0 && right==35){arr[temp].color="green";}
        await sleep(10);
    }
    arr[left].color="blue";
    arr[right].color="blue";
    await sleep(20);

    while(i<subArr1)
    {
        arr[k].y=larr[i];
        i++;
        k++;
    }

    while(j<subArr2)
    {
        arr[k].y=rarr[j];
        j++;
        k++;
    }

    if(left==0 && right==35){
        for(var i=0;i<arr.length;i++)
        {
            arr[i].color="green";
        }
    }
}

async function mergeSort(arr,left,right)
{
    if(left<right)
    {
        var mid=parseInt((left+right)/2);

        await Promise.all
        (
            [mergeSort(arr,left,mid),
            mergeSort(arr,mid+1,right)]
        );

        await merge(arr,left,mid,right);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}