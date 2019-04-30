(function() {
    const staticForm = document.getElementById("action");
    //isPrime func
    function isPrime(number) {
        if(typeof(number) != "number"){
            return false;
        }
        if(number <= 1){
            return false;
        }
        for(var i = 2; i <= number/2; i++) {
            if(number % i == 0) 
                return false;
        }
        return true;
    }
    // function isEmpty(number){
    //     if(number == null){
    //         return false;
    //     }
    //     return true;
    // }

    
    if(staticForm) {
        const enterNumber = document.getElementById("number");
        const res = document.getElementById("attempts");
        staticForm.addEventListener("submit", event => {
            event.preventDefault();
            try {

                if(document.getElementById("number").value.length == 0){
                    alert("Empty input, you must enter a positive integer to continue!");
                    return false;
                }
                
                const number = parseInt(enterNumber.value);
                const flag = isPrime(number);
                var output = "";

                if(flag) {
                    output = output + "<p class="+ '"is-prime"' + ">" + number + " is a prime number</p>"; 
                } else {
                    output = output + "<p class="+ '"not-prime"' + ">" + number + " is Not a prime number</p>";
                }
                var query = res.querySelectorAll("p");
                for(var i = 0; i < query.length; i++)
                    if(query[i].className == "is-prime") {
                        var output2 = "";
                        output2 = output2 + '<p class="is-prime">' + query[i].innerText + "</p>";
                        output = output + output2;
                    }
                    else if(query[i].className == "not-prime") {
                        var output2 = "";
                        output2 = output2 + '<p class="not-prime">' + query[i].innerText + "</p>";
                        output = output + output2;
                    }
                res.innerHTML = output;
            }
            catch(e) {
                res.innerHTML = "Error: Please enter a positive integer!";
            }
        });
    }
})();