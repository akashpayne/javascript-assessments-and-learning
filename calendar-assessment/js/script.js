/*
  Description: Script (JS) for calendar.html.
  Version: 3.0.0
  Last update: 2017/08/09
  Author: Akash Payne <akashpayne@gmail.com>
 
  Summary:
 
  A simple calendar display built in javascript.
 */

 
'use strict';
(function(window, document) {

    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];


    var daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    var daysInMonth = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

	Calendar.mem = {};
	
	Calendar.prototype.getCurrentDate = function()  {}
	
	Calendar.prototype.setCurrentDate = function(date) 
	{
        this.currentDate = date;
    };
	
	Calendar.prototype.add = funtion(time) {}
	
	Calendar.prototype.subtract = function(time) {}
	
	
	
	function Calendar(reference) 
	{
		this.todayDate = new Date();
        this.currentDate = new Date();
		function onKeyDown(e) {}
		document.onkeydown = onKeyDown.bind(this);
    }
	
	function onCalendarClick(e) {}
	
	Calendar.prototype.create = function() {}
	
	Calendar.isLeapYear = function(year) {}
	
	Calendar.getDaysInMonth = function(month, year) {}
	
Calendar.prototype.render = function() {
	var cal = Calendar.mem;
	var currDate = this.getCurrentDate();
	var year = currDate.getFullYear();
	var month = currDate.getMonth();
	
	var weeks = cal[year.toString()][month.toString()];
}

window.onload = function() 
	{
        new Calendar(document.getElementById('cal'));
    }
})(window, document);