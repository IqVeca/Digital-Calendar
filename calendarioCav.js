/**** Implementare un calendario: appena il programma parte apparirà il mese attuale con evedinzato il giorno attuale.
Ovviamente apparirà anche l'anno attuale.
Ci saranno 7 colonne, da Lun a Dom. 
Creerete due frecce per aumentare o diminuire il mese. ****/


/**** Manca la parte dei giorni differenti per ogni mese /*****/


const DIMX = 10;        //3 righe per frecce cambia mese + mese + data attuale, 1 riga giorni settimana + 6 righe per date   
const DIMY = 7;         //giorni della settimana

const Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const Days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const currentDate = new Date();          //costruttore che restituisce direttamente il giorno corrente
const currentDay = Days[currentDate.getDay()];
const currentMonth = Months[currentDate.getMonth()];
const currentYear = currentDate.getFullYear();

var monthIndex = currentDate.getMonth();     //scorre i mesi dell'anno
var dayIndex = currentDate.getDay();         //scorre i giorni della settimana

var indexToClear = 0;                       //serve per ripulire il giorno evidenziato

function CreateTable()
 {
  var table = document.createElement('table');
  table.id = 'calendario';
  var row, cell;

  for(let i = 0; i < DIMX; i++)
   {
    row = document.createElement('tr');
    
    for(let j = 0; j < DIMY; j++)
      {
        cell = document.createElement('td');
        row.appendChild(cell);
        switch(i)
         {
          case 0: 
          case 1: cell.classList.add('cellMonth'); 
                  break;
          case 2: cell.classList.add('cellCurrentDate'); 
                  break;
          case 3: cell.classList.add('cellDaysOfWeek'); 
                  cell.innerHTML = Days[j];
                  break;
          default:cell.classList.add('cell'); 
                  break;
          }
       }  
      table.appendChild(row);   
    } 

  document.body.appendChild(table);

  SettingsChangeMonth();  //impostazione freccette per il cambio mese
  InsertDays();           //inserisce giorni nel calendario
 }

function InsertDays() {
  ClearDates(); 
  var indexCountDays = FirstDayMonth(monthIndex+1);      //indice per spostarsi nelle celle dei giorni
  var countDays = 0;
  var datesOfWeek = document.getElementsByClassName('cell');

  for(let i = indexCountDays; i < datesOfWeek.length; i++) 
   {
    if(countDays !== ' ')
     {
      switch(document.getElementsByClassName('cellMonth')[10].innerHTML)
      {
       case "January":
       case "March":
       case "May":
       case "July":
       case "August":
       case "October":
       case "December":
                       countDays < 31 ? countDays++ : countDays = ' ';
                       break;
       case "February":countDays < 28 ? countDays++ : countDays = ' ';
                       break;
       default:        countDays < 30 ? countDays++ : countDays = ' ';  //aprile,giugno,settembre,novembre
                       break;
      } 
      datesOfWeek[i].innerHTML = countDays;
     }
    else
      datesOfWeek[i].innerHTML = ' ';
   }

  SearchDayInCalendar();  //evidenzia la data corrente nel calendario
}


function SettingsChangeMonth()
 {
  document.getElementsByClassName('cellMonth')[10].innerHTML = Months[monthIndex];
  document.getElementsByClassName('cellMonth')[7].innerHTML = '<b><</b>', document.getElementsByClassName('cellMonth')[13].innerHTML = '<b>></b>';

  document.getElementsByClassName('cellCurrentDate')[3].innerHTML =  currentDay+' '+currentDate.getDate()+' '+currentMonth+' '+currentYear;

  /* Impostazione per evidenziare il selettore del cambio mese */
  document.getElementsByClassName('cellMonth')[7].addEventListener('mouseover',ChangeColorText),  document.getElementsByClassName('cellMonth')[13].addEventListener('mouseover',ChangeColorText);  
  document.getElementsByClassName('cellMonth')[7].addEventListener('mouseout',ResetColorText),    document.getElementsByClassName('cellMonth')[13].addEventListener('mouseout',ResetColorText);
 
  document.getElementsByClassName('cellMonth')[7].addEventListener('click',PreviousMonth),    document.getElementsByClassName('cellMonth')[13].addEventListener('click',NextMonth);  
 }


function ChangeColorText(event) 
 {
  event.currentTarget.style.color = 'black';
 }

function ResetColorText(event) 
 {
  event.currentTarget.style.color = 'white';
 }

function PreviousMonth()
 {
  monthIndex--; 

  if(monthIndex < 0)
   monthIndex = 11;
   
  document.getElementsByClassName('cellMonth')[10].innerHTML = Months[monthIndex];
  
  SearchDayInCalendar();
  InsertDays();           //inserisce giorni nel calendario
 } 

function NextMonth()
 {
  monthIndex++; 

  if(monthIndex > 11)
   monthIndex = 0;

  document.getElementsByClassName('cellMonth')[10].innerHTML = Months[monthIndex]; 
   
  SearchDayInCalendar();
  InsertDays();           //inserisce giorni nel calendario
 }

function SearchDayInCalendar()
 {
  ClearSearchDayInCalendar(); 
  var dayInCalendar = document.getElementsByClassName('cell');
  var monthInCalendar = document.getElementsByClassName('cellMonth')[10];

  for(var i = 0; i < dayInCalendar.length; i++)
   {
     if((dayInCalendar[i].innerHTML == currentDate.getDate())&&(monthInCalendar.innerHTML == Months[currentDate.getMonth()]))
      {
        dayInCalendar[i].style.backgroundColor = "#167e56";
        indexToClear = i;
        return;
      }
   }
 } 

function ClearSearchDayInCalendar()
 {
   document.getElementsByClassName('cell')[indexToClear].style.backgroundColor = '#12121f';
 } 

function FirstDayMonth(numberMonth)
 {
  var date = new Date('2021-'+numberMonth+'-01');
  var primoGiorno = new Date(date.getFullYear(), date.getMonth(), 1);
  var day = primoGiorno.getDay();
  return day;
 }

function ClearDates()
 {
  var dates = document.getElementsByClassName('cell');

  for(let i = 0; i < dates.length; i++)
   dates[i].innerHTML = ' ';
 } 