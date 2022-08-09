export default function validate(data) {
    let ok = 0;

    data.name === "" ? errorHandler("refName") : ok++;
    data.number === "" ? errorHandler("refNumber") : ok++;
    data.mm === "" ? errorHandler("refMM") : ok++;
    data.yy === "" ? errorHandler("refYY") : ok++;
    data.cvc === "" ? errorHandler("refCVC") : ok++;

    if (data.mm > 12) {
        document.getElementById("refMM").classList.add("input-error");
        document.getElementById("e-date").classList.remove("hidden-error");
        document.getElementById("e-date").innerHTML = "Invalid date";
    } else ok++;

    return ok === 6 ? true : false;
}

const errorHandler = id => {
    console.log(id);
    //ref.current.classList.add("input-error");
    document.getElementById(id).classList.add("input-error");
    id === "refName" && document.getElementById("e-name").classList.remove("hidden-error");
    id === "refNumber" && document.getElementById("e-number").classList.remove("hidden-error");
    id === "refMM" && document.getElementById("e-date").classList.remove("hidden-error");
    id === "refYY" && document.getElementById("e-date").classList.remove("hidden-error");
    id === "refCVC" && document.getElementById("e-CVC").classList.remove("hidden-error");
};
