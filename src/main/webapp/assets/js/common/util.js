function dateValidate(dt) {
    var regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/g;
    return regex.test(dt);
}
function isEmpty(str, wscheck=true) {
    if(str == '') return true;

    let whitespace = /^\s|\s+$/g;
    if(str.replace(whitespace,'')=="") return true;

    if(str.match(/\s/g) && wscheck) return true;

    return false
}
function nameValidate(name) {
    let regex = /^[가-힣]{2,50}$/g;
    return regex.test(name);
}
function phoneNumberValidate(phone) {
    let regex = /^\d{9,12}$/g;
    return regex.test(phone);
}
function makeDateString(date) {
    return date.getFullYear()+"-"+leadinZero(date.getMonth()+1)+"-"+leadinZero(date.getDate());
}
function leadinZero(n) {
    return n<10?"0"+n:n;
}
