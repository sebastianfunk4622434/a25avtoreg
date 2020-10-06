document.addEventListener("DOMContentLoaded", function () {
    postDate();
});

function postDate() {
    var sa = "dd.mm.yyyy",
        msInDay = 86400000,
        counterLength = 90,
        months = [
            "มกราคม",
            "กุมภาพันธ์",
            "มีนาคม",
            "เมษายน",
            "พฤษภาคม",
            "มิถุนายน",
            "กรกฎาคม",
            "สิงหาคม",
            "กันยายน",
            "ตุลาคม",
            "พฤษจิกายน",
            "ธันวาคม"],
        isAbbreviated = false,
        localDate = new Date();

    if (isAbbreviated) {
        for (var i = 0; i < months.length; i++) {
            months[i] = months[i].slice(0, 3).toLowerCase();
        }
    }

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date-" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() - counter * msInDay),
            timeCounter = 0,
            timeArray = time(nodeList);
        timeArray = timeFormat(timeArray);

        for (var _i = 0; _i < nodeList.length; _i++) {
            var data = nodeList[_i].dataset;

            if (data.format) {
                nodeList[_i].innerHTML = format(date, data.format);
            } else {
                nodeList[_i].innerHTML = format(date, sa);
            }

            if (/\btime\b/.test(nodeList[_i].className)) {
                nodeList[_i].innerHTML += " " + timeArray[timeCounter];
                timeCounter++;
            }
        }
    }

    for (var _counter = 0; _counter < counterLength; _counter++) {
        var _dateClass = "date" + _counter,
            _nodeList = document.getElementsByClassName(_dateClass),
            _date = new Date(localDate.getTime() + _counter * msInDay);

        for (var _i2 = 0; _i2 < _nodeList.length; _i2++) {
            var _data = _nodeList[_i2].dataset;

            if (_data.format) {
                _nodeList[_i2].innerHTML = format(_date, _data.format);
            } else {
                _nodeList[_i2].innerHTML = format(_date);
            }
        }
    }

    function time(nodeList, reverse) {
        var timeArray = [],
            timeStatement = false;

        for (var _i3 = 0; _i3 < nodeList.length; _i3++) {
            if (nodeList[_i3].className.match(/\btime\b/)) {
                if (nodeList[_i3].className.match(/\bdate-0\b/)) {
                    timeStatement = true;
                }
                timeArray.push(timeRandom(timeStatement));
            }
        }

        if (reverse) timeArray.sort(function (a, b) {
            return b - a;
        });else timeArray.sort(function (a, b) {
            return a - b;
        });
        return timeArray;
    }

    function timeRandom(statement) {
        if (statement) {
            var _date2 = new Date(),
                timeLimit = _date2.getHours() * 60 + _date2.getMinutes();
            return Math.round(Math.random() * timeLimit);
        }
        return Math.round(Math.random() * 1440);
    }

    function timeFormat(timearray) {
        var array = [];

        for (var _i4 = 0; _i4 < timearray.length; _i4++) {
            var htemp = Math.floor(timearray[_i4] / 60),
                mtemp = timearray[_i4] % 60,
                hours = htemp < 10 ? "0" + htemp : htemp,
                minutes = mtemp < 10 ? "0" + mtemp : mtemp;
            array.push(hours + ":" + minutes);
        }

        return array;
    }

    function format(date, formatstring) {
        var innerDate = "",
            day = date.getDate(),
            year = date.getFullYear() + 543,
            month = date.getMonth() + 1,
            fo = formatstring || true;

        switch (fo) {
            case "mm.dd.yyyy":
                innerDate += month < 10 ? "0" + month : month;
                innerDate += ".";
                innerDate += day < 10 ? "0" + day : day;
                innerDate += "." + year;
                return innerDate;

            case "dd month yyyy":
                innerDate += day < 10 ? "0" + day : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;

            case "dd month":
                innerDate += day < 10 ? "0" + day : day;
                innerDate += " ";
                innerDate += months[month - 1];
                return innerDate;

            case "day dd, month yyyy":
                var days = [
                    "วันอาทิตย์",
                    "วันจันทร์",
                    "วันอังคาร",
                    "วันพุธ",
                    "วันพฦหัสบดี",
                    "วันศุกร์",
                    "วันเสาร์"
                ];
                innerDate += days[new Date(year, month, day).getDay()];
                innerDate += " ";
                innerDate += day < 10 ? "0" + day : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;

            case "dd/mm/yyyy":
                innerDate += day < 10 ? "0" + day : day;
                innerDate += "/";
                innerDate += month < 10 ? "0" + month : month;
                innerDate += "/" + year;
                return innerDate;

            case "dd-mm-yyyy":
                innerDate += day < 10 ? "0" + day : day;
                innerDate += "-";
                innerDate += month < 10 ? "0" + month : month;
                innerDate += "-" + year;
                return innerDate;

            case "yyyy.mm.dd":
                innerDate += year;
                innerDate += ".";
                innerDate += month < 10 ? "0" + month : month;
                innerDate += ".";
                innerDate += day < 10 ? "0" + day : day;
                return innerDate;

            case "month dd, yyyy":
                innerDate += months[month - 1];
                innerDate += " ";
                innerDate += day < 10 ? "0" + day : day;
                innerDate += ", ";
                innerDate += year;
                return innerDate;

            case "dd month, yyyy":
                innerDate += day < 10 ? "0" + day : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += ", ";
                innerDate += year;
                return innerDate;

            case "yyyy":
                innerDate += year;
                return innerDate;

            default:
                innerDate += day < 10 ? "0" + day : day;
                innerDate += ".";
                innerDate += month < 10 ? "0" + month : month;
                innerDate += "." + year;
                return innerDate;
        }
    }
}