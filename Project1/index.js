function findTarget(a, t){
    let l=0;
    let r=a.length-1;

    while (l<r){
        let s=a[l]+a[r];
        if(s==t){
            return [l,r];
        }
        else if(s<t){
            l++;
        }
        else{
            r--;
        }
    }

    return []
}

console.log(findTarget([-5,-2,3,4,6],7))