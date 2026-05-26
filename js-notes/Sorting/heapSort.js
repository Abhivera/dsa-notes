function heapify(arr,n,i){
    let largest =i;
    let left = 2*i+1;
    let right =2*i+2;
    if(left<n && arr[i]<arr[left]){
        largest = left;
    }
    if(right<n && arr[i]<arr[right]){
        largest = right
    }
    if(largest!=i){
        [arr[i],arr[largest]]=[arr[largest],arr[i]];
        heapify(arr,n,largest)
    }
    }
    
    function heapSort(arr){
        // leaf nodes: n/2 to n;
        // non leaf nodes: n/2 -1 to 0;
        // build Heap : convert unsorted array to max Heap or min Heap
        for(let i=Math.floor(arr.length/2)-1;i>=0;i--){
         heapify(arr,arr.length,i);   
        }
        for(let i=arr.length-1;i>=0;i--){
            [arr[0],arr[i]]=[arr[i],arr[0]];
            heapify(arr,i,0)
        }
        }
    let arr =[3,4,12,9,4,2]
    heapSort(arr);
    console.log(arr);
    // time complexity :O(NLogN)
    // space complexity: O(NLogN)