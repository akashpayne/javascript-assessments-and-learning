/*
  Description: Style guide for calendar.html.
  Version: 5.0.1
  Last update: 2017/08/10
  Author: Akash Payne <akashpayne@gmail.com>
 
  Summary:
 
  A simple calendar display built in javascript.
 */

// 'use strict' - forced declared variables, catch errors (missed typed variables). 
'use strict';
(function(window, document) {

	// variables
	
	// array of months 
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

	// array of days
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

	// methods
	
	// Main method - Calendar: initialises variables and click events (objects).
	function Calendar(reference) 
	{
        this.todayDate = new Date();
        this.currentDate = new Date();
        this.ref = reference;
        this.table = document.getElementById('calendar-frame');
        this.selectedNode;

		// previous and next month buttons and functionality (-1, +1, respectively) 
        var previous = this.ref.querySelector('#previous');
        var next = this.ref.querySelector('#next');
        previous.onclick = this.subtract.bind(this, 'month', 1);
        next.onclick = this.add.bind(this, 'month', 1);

		// triggered if arrow keys are pressed or A and D 
        function onKeyDown(e) {
            var code = e.which || e.keyCode;
            switch (code) {
				// A key
				case 65:
                // left arrow key
				case 37:
                    this.subtract.call(this, 'month', 1);
                    break;
				// D key 
				case 68: 
				// right arrow key
                case 39:
                    this.add.call(this, 'month', 1);
                    break;
                default:
                    //do nothing
            }
        }

        document.onkeydown = onKeyDown.bind(this);
        this.create().render().setViewDate(this.todayDate);
    }
	
	// onCalendarClick - gets the current and viewable dates on calendar frame from the event.
    function onCalendarClick(e) 
	{
        var target = e.target || e.srcElement;

        if (target.textContent === '' || target === this.table) return;

        var currDate = this.getCurrentDate();
        var date = parseInt(target.textContent, 10);

        if (this.selectedNode) this.selectedNode.classList.remove('selected');
        this.selectedNode = target;
        this.selectedNode.classList.add('selected');

        this.setCurrentDate(new Date(currDate.getFullYear(), currDate.getMonth(), date));
        this.setViewDate(this.getCurrentDate());
    }  

    // Static helper methods
	
	// create method creates the object Calendar object, init the vars and adds dates to the calendar.
    Calendar.prototype.create = function() 
	{
        var mem = Calendar.mem;
        var currDate = this.getCurrentDate();
        var year = currDate.getFullYear().toString();
        var month = currDate.getMonth().toString();

        if (mem[year]) 
		{
            if (mem[year][month]) return this;
            mem[year][month] = {};
        } else {
            mem[year] = {};
            mem[year][month] = {};
        }

        var weeks = mem[year][month] = [
            []
        ];
		
        var days = Calendar.getDaysInMonth(+month, +year);

        for (var d = 1, w = weeks.length - 1; d <= days; d++) 
		{
            var date = new Date(+year, +month, d);
            var day = date.getDay();

            weeks[w][day] = d;
            if (day === 6) w = weeks.push([]) - 1;
        }
        return this;
    };
	
    // isLeapYear method finds whether the given year is a leap year. 
    Calendar.isLeapYear = function(year) 
	{
        if (year === undefined) throw new ReferenceError('Error -- The year has not been defined!!');
		//  clarity purpose only && 1st exp is evaluated. If true, don't bother eval second.
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    };

	// getDaysInMonth method finds the days in the given month (of the year- checking if leapYear). 
    Calendar.getDaysInMonth = function(month, year) 
	{
        return ((month !== 1) ? (daysInMonth[month]) : (Calendar.isLeapYear(year) ? 29 : 28));
    };

	// isEqualDate method evaluates whether given dates are equal (identity) ===. 
    Calendar.isEqualDate = function(dateA, dateB) 
	{
        return +dateA.setHours(0, 0, 0, 0) === +dateB.setHours(0, 0, 0, 0);
    };

    // Caching object for storing month(s) in the memory
    Calendar.mem = {};
	
	// getCurrentDate method returns the object's current date. 
    Calendar.prototype.getCurrentDate = function() 
	{
        return this.currentDate;
    };
	
	// setCurrentDate method sets the object's current date.
    Calendar.prototype.setCurrentDate = function(date) 
	{
        this.currentDate = date;
    };

	// setViewDate method uses querySelector method on CSS selectors to assign object properties.
    Calendar.prototype.setViewDate = function(date) 
	{
        var month = months[date.getMonth()];
        var weekday = daysOfWeek[date.getDay()];

        this.ref.querySelector('#weekday').textContent = weekday;
		this.ref.querySelector('#thisMonth').textContent = month;
		this.ref.querySelector('#date').textContent = date.getDate();
        this.ref.querySelector('#month-year').textContent = month + ' ' + date.getFullYear();
		
    };

	// add method uses the set month method to increase the current month.
    Calendar.prototype.add = function(prop, time) 
	{
        var currentDate = this.getCurrentDate();
        switch (prop) 
		{
            case 'month':
                currentDate.setMonth(currentDate.getMonth() + time);
                break;
            default:
                //do null
        }
        this.create().render().setViewDate(currentDate);
        return this;
    };

	// subtract method uses the add method however, with -time, i.e. opposite direction. 
    Calendar.prototype.subtract = function(prop, time) 
	{
        this.add.call(this, prop, -time);
    };
	
	// render method renders the results from a successful response.
    Calendar.prototype.render = function() 
	{
        var cal = Calendar.mem;
        var currDate = this.getCurrentDate();
        var year = currDate.getFullYear();
        var month = currDate.getMonth();

        var weeks = cal[year.toString()][month.toString()];
        var createElem = document.createElement.bind(document);
        var table = createElem('table');
		var tableBody = document.createDocumentFragment();
        
		// calendar frame's CSS Selector ID 
		table.id = 'calendar-frame';
		
		// render calendar tr/td dates
        for (var i = 0, monthLen = weeks.length; i < monthLen; i++) 
		{
            var tr = createElem('tr');
            var week = weeks[i];
            for (var j = 0, weekLen = week.length; j < weekLen; j++) 
			{
                var td = createElem('td');
                var day = week[j];
                if (day) 
				{
                    if (day === currDate.getDate()) 
					{
                        td.classList.add('selected');
                        this.selectedNode = td;
                    }

                    if (Calendar.isEqualDate(this.todayDate, new Date(year, month, day))) {
                        td.classList.add('todayDate');
                    }
                    td.textContent = day;
                }
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        }

        table.appendChild(tableBody);
        table.onclick = onCalendarClick.bind(this);

        this.table.parentNode.replaceChild(table, this.table);
        this.table = table;
        return this;
    };

    window.onload = function() 
	{
        new Calendar(document.getElementById('cal'));
    }
})(window, document);