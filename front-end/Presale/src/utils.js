import moment from "moment";
import web3 from 'web3';
import Swal from 'sweetalert2';

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

export function isMobile() {
  if (window) {
    return window.matchMedia(`(max-width: 767px)`).matches;
  }
  return false;
}

export function isMdScreen() {
  if (window) {
    return window.matchMedia(`(max-width: 1199px)`).matches;
  }
  return false;
}

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}

function elmYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
}

export function scrollTo(scrollableElement, elmID) {
  var elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elmYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function (leapY) {
          return () => {
            scrollableElement.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function (leapY) {
        return () => {
          scrollableElement.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
}

export function getTimeDifference(date) {
  let difference =
    moment(new Date(), "DD/MM/YYYY HH:mm:ss").diff(
      moment(date, "DD/MM/YYYY HH:mm:ss")
    ) / 1000;

  if (difference < 60) return `${Math.floor(difference)} seconds`;
  else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
  else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
  else if (difference < 86400 * 30)
    return `${Math.floor(difference / 86400)} days`;
  else if (difference < 86400 * 30 * 12)
    return `${Math.floor(difference / 86400 / 30)} months`;
  else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function isNewTime(timestamp) {
  const diff =  getUTCNow() - timestamp * 1000;
  if (diff <= 3600 * 24 * 1000)
    return true;
  else 
    return false;
}

export function getUTCNow() {
  var date = new Date();
  var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  return now_utc;
}

export function getUTCTimestamp(date) {
  const utc_date = new Date(date);
  var date_utc = Date.UTC(utc_date.getUTCFullYear(), utc_date.getUTCMonth(), utc_date.getUTCDate(), utc_date.getUTCHours(), utc_date.getUTCMinutes(), utc_date.getUTCSeconds());
  return date_utc;
}

export function getDeadlineTimestamp(start_time, duration) {
  const utc_date = new Date(parseInt(start_time));
  const start_utc = Date.UTC(utc_date.getUTCFullYear(), utc_date.getUTCMonth(), utc_date.getUTCDate(), utc_date.getUTCHours(), utc_date.getUTCMinutes(), utc_date.getUTCSeconds());
  if (duration > 3650)
    duration = 3650;
  return start_utc + duration * 24 * 3600 * 1000;
}

export function getDate(timestamp) {
  const num_time = parseInt(timestamp) * 1000;
  const date = new Date(num_time);
  return moment(date).format("YYYY/MM/DD");
}

export function getStringDate(timestamp) {
  const num_time = parseInt(timestamp) * 1000;
  const date = new Date(num_time);
  return moment(date).format("DD MMM");
}

export function validationStartTime(start_time) {
  const start_date = new Date(parseInt(start_time * 1000));  
  const now_date = new Date();
  let difference =
    moment(start_date, "DD/MM/YYYY HH:mm:ss").diff(
      moment(now_date, "DD/MM/YYYY HH:mm:ss")
    ) / 1000;
  if (difference > -86400)
    return true;
  else
    return false;
}

export function generateRandomId() {
  let tempId = Math.random().toString();
  let uid = tempId.substr(2, tempId.length - 1);
  return uid;
}

export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(
    window.location.href.slice(window.location.href.indexOf("?") + 1)
  );
  var definitions = search.split("&");
  definitions.forEach(function (val, key) {
    var parts = val.split("=", 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
  return Object.entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(" ");
}


export const numberWithCommas = (x) => {
  return x.toLocaleString(undefined, { maximumFractionDigits: 5 });
}

export const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export function fromWei(value) {
  const data = web3.utils.fromWei(value.toString());
  return data;
}

export function toWei(value) {
  const data = web3.utils.toWei(value.toString());
  return numberWithCommas(data);
}

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})