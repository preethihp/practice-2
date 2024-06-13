document.getElementById("rzp-button").onclick = async function(e) {
    const token = sessionStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/purchase/premiummembership', { headers: { "Authorization": `Bearer ${token}` } });
    console.log(response);

    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function(response) {
            await axios.post("http://localhost:3000/purchase/updatetransactionstatus", {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id
            }, { headers: { "Authorization": `Bearer ${token}` } });
            
                localStorage.setItem('isPremiumUser', 'true');
                document.getElementById('premium-message').innerText = 'You are a premium user now'; 
                document.getElementById("rzp-button").style.visibility="hidden";
                alert("You are a premium user now");
            
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', async function(response) {
        console.log(response);
        await axios.post("http://localhost:3000/purchase/transactionfailed", {
            order_id: options.order_id
        }, { headers: { "Authorization": `Bearer ${token}` } });
        alert("Something went wrong");
    });
}