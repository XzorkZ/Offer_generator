// script.js

function generateOffer() {
    var busSeat = document.getElementById("bus-seat").value;
    var startCity = document.getElementById("start-city").value;
    var startDate = document.getElementById("start-date").value;
    var endCity = document.getElementById("end-city").value;
    var endDate = document.getElementById("end-date").value;

    try {
        var dateFormat = "DD.MM.YYYY";
        var a = moment(startDate, dateFormat);
        var b = moment(endDate, dateFormat);
        var delta = b.diff(a, 'days') + 1;
        document.getElementById("total-days").innerText = "Total " + delta + " day(s)";
    } catch (error) {
        console.error("Date error:", error);
        document.getElementById("total-days").innerText = "!!!---Date error---!!!";
        return;
    }

    var price = document.getElementById("price").value;

    var offerType;
    if (document.getElementById("normal").checked) {
        offerType = "a";
    } else if (document.getElementById("all-inc").checked) {
        offerType = "b";
    } else if (document.getElementById("all-inc-meals").checked) {
        offerType = "c";
    } else if (document.getElementById("like-gem").checked) {
        offerType = "d"; 
    } else if (document.getElementById("all-inc-Hotel").checked) {
        offerType = "e"; 
    } else if (document.getElementById("all-inc-meals-Hotel").checked) {
        offerType = "f"; 
    } else {
        alert("Please choose an offer type.");
        return;
    }

    var offer = generateOfferText(busSeat, startCity, startDate, endCity, endDate, delta, price, offerType);

    document.getElementById("offer-result").innerText = offer;
    document.getElementById("copy-button").disabled = false;
}

function copyToClipboard() {
    var offerResult = document.getElementById("offer-result");
    var textToCopy = offerResult.innerText;

    navigator.clipboard.writeText(textToCopy)
        .then(function() {
            console.log('Text successfully copied to clipboard');
            alert('Text copied to clipboard!');
        })
        .catch(function(err) {
            console.error('Unable to copy text to clipboard', err);
            alert('Failed to copy text to clipboard');
        });
}

function generateOfferText(busSeat, startCity, startDate, endCity, endDate, delta, price, offerType) {
    var inclusions, offerText;

    if (offerType === "a") {
        inclusions = "Inclusions: vehicle, 1 driver, petrol, VAT and tolls.\nExclusions: City permits, parking fees, driver's accommodation, meals, tips and any costs, not mentioned in inclusions.";
    } else if (offerType === "b") {
        inclusions = "Inclusions: vehicle, 1 driver, petrol, VAT, tolls, City permits and parking fees.\nExclusions: driver's accommodation, meals, tips and any costs, not mentioned in inclusions.";
    } else if (offerType === "c") {
        inclusions = "Inclusions: vehicle, 1 driver, petrol, VAT, tolls, driver's meals, city permits and parking fees.\nExclusions: Driver's accommodation, tips and any costs, not mentioned in inclusions.";
    } else if (offerType === "d") {
        inclusions = "Inclusions: vehicle, 1 driver, petrol and VAT.\nExclusions: Tolls, city permits, parking fees, driver's accommodation, meals, tips and any costs, not mentioned in inclusions.";
    } else if (offerType === "e") {
        inclusions = "Inclusions: vehicle, 1 driver, petrol, VAT, tolls, City permits, parking fees and driver's accommodation.\nExclusions: Driver's meals, tips and any costs, not mentioned in inclusions.";
    } else if (offerType === "f") {
        inclusions = "Inclusions: vehicle, 1 driver, petrol, VAT, tolls, City permits, parking fees, driver's accommodation and meals.\nExclusions: Driver's tips and any costs, not mentioned in inclusions.";
    }


    offerText = `
Please find our best price and conditions below.

Type of coach (Capacity): ${busSeat} Seat Coach

Date: ${startDate} - ${endDate} ( ${delta} days )

Service description: ${startCity} - ${endCity}

Price: ${price}€
${inclusions}

The offer includes 12 hours of service per day. Extra hours will be charged at 50 EUR per additional hour if paid on the spot, or 100 EUR per additional hour if paid by bank transfer.

Driver meals cost 30 EUR per day if paid on the spot, or 40 EUR per day if paid by bank transfer if the driver cannot have meals with the group. Providing breakfast at the hotel for the driver is mandatory.

A mandatory driver tip of €2 per person per day applies, with a minimum of €30 per day for a 19+1 seat Sprinter and €40 per day for a 49+1 seat.

Passengers can purchase a 500ml bottle of water directly from the bus driver for €1 when paying in cash or €1.50 if opting for payment via invoice.

Please note that this offer is provided for informational purposes only; no coach has been booked at this time.

If you wish to proceed with booking our services, we kindly request that you re-confirm availability with our sales agent.

Jinlei
 `;

    return offerText;
}
