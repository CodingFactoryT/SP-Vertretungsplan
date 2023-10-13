import React, { useState, useEffect, useContext } from 'react';
import ISubstitutionPlanEntry from '../../interfaces/SchulportalData/ISubstitutionPlanEntry';
import axios from 'axios';
import parseSubstitutionPlanHTML from '../../services/parsing/apiHTMLResponse/parseSubstitutionPlanHTML';
import { SIDContext } from '../../contexts/Contexts';

export function useSubstitutionPlanEntriesWithDates() {
    const [firstDate, setFirstDate] = useState("");
    const [secondDate, setSecondDate] = useState("");
    const [substitutionPlanEntriesOfFirstDate, setSubstitutionPlanEntriesOfFirstDate] = useState<ISubstitutionPlanEntry[]>([]);
    const [substitutionPlanEntriesOfSecondDate, setSubstitutionPlanEntriesOfSecondDate] = useState<ISubstitutionPlanEntry[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [sid] = useContext(SIDContext);

    useEffect(() => {
        fetchSubstitutionPlanHTML(sid)
            .then((response) => {
                let vertretungsplanHTML;
                vertretungsplanHTML = response.data;
                //vertretungsplanHTML = '<!DOCTYPE html> <!-- saved from url=(0055)https://start.schulportal.hessen.de/vertretungsplan.php --> <html lang="de"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Vertretungsplan - Schulportal Hessen - Pädagogische Organisation</title> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/log.js.Herunterladen"></script> <link rel="manifest" href="https://start.schulportal.hessen.de/manifests/6013/manifest.json"> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/manifest.js.Herunterladen"></script> <link rel="stylesheet" href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap.min.css"> <link rel="icon" type="image/png" sizes="32x32" href="https://start.schulportal.hessen.de/img/favicon-32x32.png"> <link rel="icon" type="image/png" sizes="32x32" href="https://start.schulportal.hessen.de/img/favicon-32x32.png"> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/responsive-text.css" rel="stylesheet"> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/own.20161117.css" rel="stylesheet"> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/all.min.css" rel="stylesheet"> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/solid.min.css" rel="stylesheet"> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/v4-shims.min.css" rel="stylesheet"> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jquery-1.11.2.min.js.Herunterladen"></script> <link rel="stylesheet" href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/theme.css"> <link rel="stylesheet" href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jquery-ui.min.css"> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jquery-ui.min.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/stickynav.js.Herunterladen"></script> <meta name="description" content="Schulportal Hessen"> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap.min.js.Herunterladen"></script> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap.submenue.css" rel="stylesheet"> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/e357e97e4733a190ce72d0d6c1c439d3.css" rel="stylesheet"> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jquery.cookie.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/topapps.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jquery.logoutTimer.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/allPages.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/matheretter.js.Herunterladen"></script> <meta name="theme-color" content="#254a7c"> </head> <body> <div class="allButFooter"> <div class="hidden-print"> <nav class="navbar navbar-default visible-lg visible-md navbar-custom navbar-first"> <div class="container"> <div class="navbar-header"> <a class="navbar-brand" href="https://start.schulportal.hessen.de/index.php"> <img src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/logo-schulportal-topbar.svg" title="Schulportal Hessen" style="position: relative; left: -13px; top: -16px" width="300"> </a> </div> <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> </div> </div> </nav> </div> <div class="hidden-print" style="background-color: #ffffff;" id="headlogo"> <div class="container visible-lg visible-md"> <div class="masthead"> <div class="row headlogo"> <div class="col-md-12"> <img src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/9db99dc62e0821774e3298846253f035.png" class="hidden-phone img-responsive pull-left" style="padding-right: 10px; display: inline;vertical-align: middle;"> <div style="padding-top: 15px;"> <p class="headtitle">Kopernikusschule Freigericht <small>Freigericht</small><span id="institutionsid" data-bezeichnung="Kopernikusschule Freigericht" class="hidden">6013</span></p> <div class="hidden-phone tiny">"Schulportal Hessen - Pädagogische Organisation"</div> </div> </div> </div> </div> </div> </div> <div class="sticky-wrapper" style="height: auto;"></div> <div class="navbar navbar-default navbar-custom navbar-last hidden-print sticky" role="navigation" data-toggle="sticky-onscroll"> <div class="container"> <div class="navbar-header visible-sm visible-xs"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="https://start.schulportal.hessen.de/index.php"> Kopernikusschule Freigericht</a> </div> <div class="navbar-collapse collapse"> <ul class="nav navbar-nav" id="menueband"> <li><a href="https://start.schulportal.hessen.de/index.php" data-wx="no" title="Startseite"><i class="fa fa-home fa-fw" aria-hidden="true"></i> Start</a> </li> <li class="dropdown"> <a aria-expanded="false" role="button" data-toggle="dropdown" class="dropdown-toggle" href="https://start.schulportal.hessen.de/vertretungsplan.php#" id="topapps"><span class="fa fa-bars"></span> Apps <span class="caret"></span></a> <ul role="menu" class="dropdown-menu"> <li><a href="https://start.schulportal.hessen.de/vertretungsplan.php#"><i class="fa fa-spinner fa-spin fa-fw"></i> Lade ...</a></li> </ul> </li> </ul> <ul class="nav navbar-nav navbar-right"> <li class="dropdown"> <a aria-expanded="false" role="button" data-toggle="dropdown" class="dropdown-toggle" href="https://start.schulportal.hessen.de/vertretungsplan.php#"> <span class="glyphicon glyphicon-user"></span> Bäsler, Tim (Q2f) <span class="caret"></span> </a> <ul role="menu" class="dropdown-menu"> <li><a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userChangePassword" data-wx="no"><span class="fa fa-key fa-fw"></span> Passwort ändern</a></li> <li><a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userMail" data-wx="no"><span class="fa fa-at fa-fw"></span> E-Mail &amp; Benachrichtigungen</a> </li> <li><a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userFoto" data-wx="no"><span class="fa fa-image fa-fw"></span> Foto</a></li> <li role="separator" class="divider"></li> <li><a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userData" data-wx="no"><span class="fa fa-list fa-fw"></span> Benutzerdaten</a></li> <li role="separator" class="divider"></li> <li><a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userAutologins" data-wx="no"><span class="fa fa-sign-in fa-fw"></span> Automatische Anmeldungen</a> </li> </ul> </li> <li class="dropdown"> <a aria-expanded="false" role="button" data-toggle="dropdown" class="dropdown-toggle" href="https://start.schulportal.hessen.de/vertretungsplan.php#"><span class="glyphicon glyphicon-wrench"></span> Support<span class="caret"></span></a> <ul role="menu" class="dropdown-menu"> <li><a href="https://start.schulportal.hessen.de/lanis-support.php" data-click="support" target="_blank"><span class="fa fa-life-ring"></span> Support</a></li> <li> <a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userDSGVO"><span class="glyphicon glyphicon-eye-open"></span> Datenschutz</a></li> <li><a href="https://support.schulportal.hessen.de/knowledgebase.php?category=45" target="_blank"><span class="glyphicon glyphicon-question-sign"></span> Hilfe/FAQ</a> </li> <li class="divider"></li> <li><a href="https://start.schulportal.hessen.de/verwaltung.php?a=impressum" target="_blank"><span class="glyphicon glyphicon-info-sign"></span> Impressum</a></li> </ul> </li> <li><a href="https://start.schulportal.hessen.de/index.php?logout=all" data-wx="no"><span title="Abmeldung aus allen angebundenen Systemen"><span class="fa fa-power-off fw"></span> Logout</span></a></li> </ul> </div> </div> </div> <div class="container"> <div class="row clearfix hidden-print"> <div class="col-md-12 column logoutTimer"> <div class="alert alert-danger" id="logoutTimer" style="display: none;"><b>Automatischer Logout:</b> Es konnte längere Zeit keine Aktion auf dieser Seite festgestellt werden. <br>Der automatische Logout erfolgt daher in <span id="timer"></span> Sekunden! <a class="btn btn-danger" onclick="$.breaklogoutTimer();" data-wx="no">Ich möchte weiter arbeiten, bitte nicht ausloggen</a></div> </div> </div> <div id="content"> <h1> <span class="hidden-xs"> Mein Vertretungsplan</span><span class="visible-xs">Mein Vplan</span></h1> <div class="row clearfix"> <div> <div class="panel panel-info" id="menue_tag"> <div class="panel-body"> <button data-tag="17_07_2023" class="btn btn-info"> Montag,\n <span class="hidden-xs">den </span> 17.07<span class="hidden-xs">.2023</span> <span class="badge label-warning">6</span> <span class="label label-default">morgen</span> </button> <button data-tag="18_07_2023" class="btn btn-info"> Dienstag,\n <span class="hidden-xs">den </span> 18.07<span class="hidden-xs">.2023</span> <span class="badge label-warning">31</span> </button> </div> </div> <div class="panel panel-info" style="display: block;" id="tag17_07_2023"> <div class="panel-heading"> Montag<span class="hidden-xs">, den 17.07.2023</span> <span class="badge">morgen</span> <span class="badge woche"> 29. Woche </span> </div> <div class="panel-body"> <h3>Vertretungen am 17.07.2023</h3> <div class="bootstrap-table"> <div class="fixed-table-toolbar"> <div class="bs-bars pull-left"></div> <div class="columns columns-right btn-group pull-right"> <button class="btn btn-default" type="button" name="toggle" title="Umschalten"><i class="glyphicon glyphicon-list-alt icon-list-alt"></i></button> <div class="keep-open btn-group" title="Spalten"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-th icon-th"></i> <span class="caret"></span></button> <ul class="dropdown-menu" role="menu"> <li><label><input type="checkbox" data-field="_farbe" value="0" checked="checked"> </label></li> <li><label><input type="checkbox" data-field="Stunde" value="1" checked="checked"> Stunde </label></li> <li><label><input type="checkbox" data-field="Klasse" value="2" checked="checked"> Klasse </label></li> <li><label><input type="checkbox" data-field="Vertreter" value="3" checked="checked"> Vertretung </label></li> <li><label><input type="checkbox" data-field="Lehrer" value="4" checked="checked"> Lehrkraft </label></li> <li><label><input type="checkbox" data-field="Art" value="5" checked="checked"> Art </label></li> <li><label><input type="checkbox" data-field="Fach" value="6" checked="checked"> Fach </label></li> <li><label><input type="checkbox" data-field="Fach_alt" value="7" checked="checked"> Fach_alt </label></li> <li><label><input type="checkbox" data-field="Raum" value="8" checked="checked"> Raum </label></li> <li><label><input type="checkbox" data-field="Raum_alt" value="9" checked="checked"> Raum_alt </label></li> <li><label><input type="checkbox" data-field="Hinweis" value="10" checked="checked"> Hinweis </label></li> </ul> </div> </div> <div class="pull-right search"><input class="form-control" type="text" placeholder="Suchen"></div> </div> <div class="fixed-table-container" style="padding-bottom: 0px;"> <div class="fixed-table-header" style="display: none;"> <table></table> </div> <div class="fixed-table-body"> <div class="fixed-table-loading" style="top: 1px;">Lade, bitte warten...</div> <table class="table table-hover table-condensed table-striped" id="vtable17_07_2023" data-classview="no" data-toggle="table" data-pagination="true" data-page-size="All" data-page-list="[15,30,50,100]" data-show-toggle="true" data-show-columns="true" data-search="true" data-state-save="true" data-toolbar="#toolbar17072023"> <thead style=""> <tr> <th style="" data-field="_farbe" tabindex="0"> <div class="th-inner "></div> <div class="fht-cell"></div> </th> <th style="" data-field="Stunde" tabindex="0"> <div class="th-inner sortable both"> Stunde </div> <div class="fht-cell"></div> </th> <th style="" data-field="Klasse" tabindex="0"> <div class="th-inner sortable both"> Klasse </div> <div class="fht-cell"></div> </th> <th style="" data-field="Vertreter" tabindex="0"> <div class="th-inner sortable both"> Vertretung </div> <div class="fht-cell"></div> </th> <th style="" data-field="Lehrer" tabindex="0"> <div class="th-inner sortable both"> Lehrkraft </div> <div class="fht-cell"></div> </th> <th style="" data-field="Art" tabindex="0"> <div class="th-inner sortable both"> Art </div> <div class="fht-cell"></div> </th> <th style="" data-field="Fach" tabindex="0"> <div class="th-inner sortable both"> Fach </div> <div class="fht-cell"></div> </th> <th style="" data-field="Fach_alt" tabindex="0"> <div class="th-inner sortable both"> Fach_alt </div> <div class="fht-cell"></div> </th> <th style="" data-field="Raum" tabindex="0"> <div class="th-inner sortable both"> Raum </div> <div class="fht-cell"></div> </th> <th style="" data-field="Raum_alt" tabindex="0"> <div class="th-inner sortable both"> Raum_alt </div> <div class="fht-cell"></div> </th> <th style="" data-field="Hinweis" tabindex="0"> <div class="th-inner sortable both"> Hinweis </div> <div class="fht-cell"></div> </th> </tr> </thead> <tbody> <tr data-index="0"> <td style="" title="1 - 2 Stunde: Entfall von FLK1 bei &lt;del&gt;BEN&lt;/del&gt;"> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2a, Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>BEN</del> </td> <td style=""> Entfall </td> <td style=""> FLK1 </td> <td style=""> FLK1 </td> <td style=""> </td> <td style=""> 607 </td> <td style=""> fällt aus </td> </tr> <tr data-index="1"> <td style="" title="1 - 2 Stunde: Entfall von FGK1 bei &lt;del&gt;BEN&lt;/del&gt;"> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2a, Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>BEN</del> </td> <td style=""> Entfall </td> <td style=""> FGK1 </td> <td style=""> FGK1 </td> <td style=""> </td> <td style=""> 609 </td> <td style=""> fällt aus </td> </tr> <tr data-index="2"> <td style="" title="3 - 4 Stunde: Entfall von MGK5 bei &lt;del&gt;MUK&lt;/del&gt;"> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2a, Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>MUK</del> </td> <td style=""> Entfall </td> <td style=""> MGK5 </td> <td style=""> MGK5 </td> <td style=""> </td> <td style=""> 612 </td> <td style=""> fällt aus </td> </tr> <tr data-index="3"> <td style="" title="5 - 6 Stunde: Entfall von ELK1 bei &lt;del&gt;PAL&lt;/del&gt;"> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2a, Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>PAL</del> </td> <td style=""> Entfall </td> <td style=""> ELK1 </td> <td style=""> ELK1 </td> <td style=""> </td> <td style=""> 508 </td> <td style=""> fällt aus </td> </tr> <tr data-index="4"> <td style="" title="5 - 6 Stunde: Entfall von EGK1 bei &lt;del&gt;EIT&lt;/del&gt;"> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2a, Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>EIT</del> </td> <td style=""> Entfall </td> <td style=""> EGK1 </td> <td style=""> EGK1 </td> <td style=""> </td> <td style=""> 608 </td> <td style=""> fällt aus </td> </tr> <tr data-index="5"> <td style="" title="5 - 6 Stunde: Entfall von EGK3 bei &lt;del&gt;ZIE&lt;/del&gt;"> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2a, Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>ZIE</del> </td> <td style=""> Entfall </td> <td style=""> EGK3 </td> <td style=""> EGK3 </td> <td style=""> </td> <td style=""> 611 </td> <td style=""> fällt aus </td> </tr> </tbody> </table> </div> <div class="fixed-table-footer" style="display: none;"> <table> <tbody> <tr></tr> </tbody> </table> </div> <div class="fixed-table-pagination"> <div class="pull-left pagination-detail"> <span class="pagination-info">Zeige 1 bis 6 von 6 Zeilen</span> <span class="page-list" style="display: none;"> <span class="btn-group dropup"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="page-size">All</span> <span class="caret"></span></button> <ul class="dropdown-menu" role="menu"> <li><a>15</a></li> </ul> </span> Einträge pro Seite </span> </div> <div class="pull-right pagination" style="display: none;"> <ul class="pagination"> <li class="page-pre"><a href="javascript:void(0)">‹</a></li> <li class="page-number active"><a>1</a></li> <li class="page-next"><a href="javascript:void(0)">›</a></li> </ul> </div> </div> </div> </div> <div class="clearfix"></div> <div class="pull-right"><i>Letzte Aktualisierung: 14.07.2023 um 13:32:38 Uhr</i></div> </div> </div> <div class="panel panel-info" style="display: none;" id="tag18_07_2023"> <div class="panel-heading"> Dienstag<span class="hidden-xs">, den 18.07.2023</span> <span class="badge woche"> 29. Woche </span> </div> <div class="panel-body"> <h3>Vertretungen am 18.07.2023</h3> <div class="bootstrap-table"> <div class="fixed-table-toolbar"> <div class="bs-bars pull-left"></div> <div class="columns columns-right btn-group pull-right"> <button class="btn btn-default" type="button" name="toggle" title="Umschalten"><i class="glyphicon glyphicon-list-alt icon-list-alt"></i></button> <div class="keep-open btn-group" title="Spalten"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><i class="glyphicon glyphicon-th icon-th"></i> <span class="caret"></span></button> <ul class="dropdown-menu" role="menu"> <li><label><input type="checkbox" data-field="_farbe" value="0" checked="checked"> </label></li> <li><label><input type="checkbox" data-field="Stunde" value="1" checked="checked"> Stunde </label></li> <li><label><input type="checkbox" data-field="Klasse" value="2" checked="checked"> Klasse </label></li> <li><label><input type="checkbox" data-field="Vertreter" value="3" checked="checked"> Vertretung </label></li> <li><label><input type="checkbox" data-field="Lehrer" value="4" checked="checked"> Lehrkraft </label></li> <li><label><input type="checkbox" data-field="Art" value="5" checked="checked"> Art </label></li> <li><label><input type="checkbox" data-field="Fach" value="6" checked="checked"> Fach </label></li> <li><label><input type="checkbox" data-field="Fach_alt" value="7" checked="checked"> Fach_alt </label></li> <li><label><input type="checkbox" data-field="Raum" value="8" checked="checked"> Raum </label></li> <li><label><input type="checkbox" data-field="Raum_alt" value="9" checked="checked"> Raum_alt </label></li> <li><label><input type="checkbox" data-field="Hinweis" value="10" checked="checked"> Hinweis </label></li> </ul> </div> </div> <div class="pull-right search"><input class="form-control" type="text" placeholder="Suchen"></div> </div> <div class="fixed-table-container" style="padding-bottom: 0px;"> <div class="fixed-table-header" style="display: none;"> <table></table> </div> <div class="fixed-table-body"> <div class="fixed-table-loading" style="top: 1px;">Lade, bitte warten...</div> <table class="table table-hover table-condensed table-striped" id="vtable18_07_2023" data-classview="no" data-toggle="table" data-pagination="true" data-page-size="All" data-page-list="[15,30,50,100]" data-show-toggle="true" data-show-columns="true" data-search="true" data-state-save="true" data-toolbar="#toolbar18072023"> <thead style=""> <tr> <th style="" data-field="_farbe" tabindex="0"> <div class="th-inner "></div> <div class="fht-cell"></div> </th> <th style="" data-field="Stunde" tabindex="0"> <div class="th-inner sortable both"> Stunde </div> <div class="fht-cell"></div> </th> <th style="" data-field="Klasse" tabindex="0"> <div class="th-inner sortable both"> Klasse </div> <div class="fht-cell"></div> </th> <th style="" data-field="Vertreter" tabindex="0"> <div class="th-inner sortable both"> Vertretung </div> <div class="fht-cell"></div> </th> <th style="" data-field="Lehrer" tabindex="0"> <div class="th-inner sortable both"> Lehrkraft </div> <div class="fht-cell"></div> </th> <th style="" data-field="Art" tabindex="0"> <div class="th-inner sortable both"> Art </div> <div class="fht-cell"></div> </th> <th style="" data-field="Fach" tabindex="0"> <div class="th-inner sortable both"> Fach </div> <div class="fht-cell"></div> </th> <th style="" data-field="Fach_alt" tabindex="0"> <div class="th-inner sortable both"> Fach_alt </div> <div class="fht-cell"></div> </th> <th style="" data-field="Raum" tabindex="0"> <div class="th-inner sortable both"> Raum </div> <div class="fht-cell"></div> </th> <th style="" data-field="Raum_alt" tabindex="0"> <div class="th-inner sortable both"> Raum_alt </div> <div class="fht-cell"></div> </th> <th style="" data-field="Hinweis" tabindex="0"> <div class="th-inner sortable both"> Hinweis </div> <div class="fht-cell"></div> </th> </tr> </thead> <tbody> <tr data-index="0"> <td style="" title="1 - 2 Stunde: Entfall von DLK1 bei &lt;del&gt;FAB&lt;/del&gt;"> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>FAB</del> </td> <td style=""> Entfall </td> <td style=""> DLK1 </td> <td style=""> DLK1 </td> <td style=""> </td> <td style=""> 607 </td> <td style=""> fällt aus </td> </tr> <tr data-index="1"> <td style=""> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> CUR </td> <td style=""> <del>CUR</del> </td> <td style=""> Vertretung </td> <td style=""> DGK1 </td> <td style=""> DGK1 </td> <td style=""> 608 </td> <td style=""> 608 </td> <td style=""> </td> </tr> <tr data-index="2"> <td style=""> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> SMT </td> <td style=""> <del>SMT</del> </td> <td style=""> Vertretung </td> <td style=""> DGK2 </td> <td style=""> DGK2 </td> <td style=""> 508 </td> <td style=""> 508 </td> <td style=""> </td> </tr> <tr data-index="3"> <td style=""> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> SMI </td> <td style=""> <del>SMI</del> </td> <td style=""> Vertretung </td> <td style=""> DGK3 </td> <td style=""> DGK3 </td> <td style=""> 612 </td> <td style=""> 612 </td> <td style=""> </td> </tr> <tr data-index="4"> <td style=""> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> MOR </td> <td style=""> <del>MOR</del> </td> <td style=""> Vertretung </td> <td style=""> DGK4 </td> <td style=""> DGK4 </td> <td style=""> 611 </td> <td style=""> 611 </td> <td style=""> </td> </tr> <tr data-index="5"> <td style=""> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> LOB </td> <td style=""> <del>LOB</del> </td> <td style=""> Vertretung </td> <td style=""> DGK5 </td> <td style=""> DGK5 </td> <td style=""> 610 </td> <td style=""> 610 </td> <td style=""> </td> </tr> <tr data-index="6"> <td style=""> &nbsp; </td> <td style=""> 1 - 2 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> WSS </td> <td style=""> <del>WSS</del> </td> <td style=""> Vertretung </td> <td style=""> DGK6 </td> <td style=""> DGK6 </td> <td style=""> 613 </td> <td style=""> 613 </td> <td style=""> </td> </tr> <tr data-index="7"> <td style=""> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> BEC </td> <td style=""> <del>BEC</del> </td> <td style=""> Vertretung </td> <td style=""> GGK1 </td> <td style=""> GGK1 </td> <td style=""> 609 </td> <td style=""> 609 </td> <td style=""> </td> </tr> <tr data-index="8"> <td style=""> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> ROQ </td> <td style=""> <del>ROQ</del> </td> <td style=""> Vertretung </td> <td style=""> GGKbiF1 </td> <td style=""> GGKbiF1 </td> <td style=""> 608 </td> <td style=""> 608 </td> <td style=""> </td> </tr> <tr data-index="9"> <td style=""> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> BUT </td> <td style=""> <del>BUT</del> </td> <td style=""> Vertretung </td> <td style=""> GGK2 </td> <td style=""> GGK2 </td> <td style=""> 607 </td> <td style=""> 607 </td> <td style=""> </td> </tr> <tr data-index="10"> <td style=""> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> FEI </td> <td style=""> <del>FEI</del> </td> <td style=""> Vertretung </td> <td style=""> GGK3 </td> <td style=""> GGK3 </td> <td style=""> 610 </td> <td style=""> 610 </td> <td style=""> </td> </tr> <tr data-index="11"> <td style=""> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> MAG </td> <td style=""> <del>MAG</del> </td> <td style=""> Vertretung </td> <td style=""> GGK4 </td> <td style=""> GGK4 </td> <td style=""> 614 </td> <td style=""> 614 </td> <td style=""> </td> </tr> <tr data-index="12"> <td style=""> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> SRO </td> <td style=""> <del>SRO</del> </td> <td style=""> Vertretung </td> <td style=""> GGK5 </td> <td style=""> GGK5 </td> <td style=""> 612 </td> <td style=""> 612 </td> <td style=""> </td> </tr> <tr data-index="13"> <td style="" title="3 - 4 Stunde: Entfall von GGK6 bei &lt;del&gt;ULL&lt;/del&gt;"> &nbsp; </td> <td style=""> 3 - 4 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>ULL</del> </td> <td style=""> Entfall </td> <td style=""> GGK6 </td> <td style=""> GGK6 </td> <td style=""> </td> <td style=""> 613 </td> <td style=""> fällt aus </td> </tr> <tr data-index="14"> <td style="" title="5 - 6 Stunde: Entfall von BIGK2 bei &lt;del&gt;NIE&lt;/del&gt;"> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>NIE</del> </td> <td style=""> Entfall </td> <td style=""> BIGK2 </td> <td style=""> BIGK2 </td> <td style=""> </td> <td style=""> 409 </td> <td style=""> fällt aus </td> </tr> <tr data-index="15"> <td style=""> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> KAP </td> <td style=""> <del>KAP</del> </td> <td style=""> Vertretung </td> <td style=""> BILK1 </td> <td style=""> BILK1 </td> <td style=""> 408 </td> <td style=""> 408 </td> <td style=""> </td> </tr> <tr data-index="16"> <td style=""> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> SAR </td> <td style=""> <del>SAR</del> </td> <td style=""> Vertretung </td> <td style=""> PHLK1 </td> <td style=""> PHLK1 </td> <td style=""> 411 </td> <td style=""> 411 </td> <td style=""> </td> </tr> <tr data-index="17"> <td style=""> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> ALT </td> <td style=""> <del>ALT</del> </td> <td style=""> Vertretung </td> <td style=""> PHGK2 </td> <td style=""> PHGK2 </td> <td style=""> 412 </td> <td style=""> 412 </td> <td style=""> </td> </tr> <tr data-index="18"> <td style=""> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> KAE </td> <td style=""> <del>KAE</del> </td> <td style=""> Vertretung </td> <td style=""> CHGK2 </td> <td style=""> CHGK2 </td> <td style=""> 402 </td> <td style=""> 402 </td> <td style=""> </td> </tr> <tr data-index="19"> <td style=""> &nbsp; </td> <td style=""> 5 - 6 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> CRI </td> <td style=""> <del>CRI</del> </td> <td style=""> Vertretung </td> <td style=""> BIGK3 </td> <td style=""> BIGK3 </td> <td style=""> 410 </td> <td style=""> 410 </td> <td style=""> </td> </tr> <tr data-index="20"> <td style="" title="7 Stunde: Entfall von ITAf1 bei &lt;del&gt;BRN&lt;/del&gt;"> &nbsp; </td> <td style=""> 7 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>BRN</del> </td> <td style=""> Entfall </td> <td style=""> ITAf1 </td> <td style=""> ITAf1 </td> <td style=""> </td> <td style=""> 612 </td> <td style=""> fällt aus </td> </tr> <tr data-index="21"> <td style=""> &nbsp; </td> <td style=""> 8 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> GES </td> <td style=""> <del>GES</del> </td> <td style=""> Vertretung </td> <td style=""> POWILK1 </td> <td style=""> POWILK1 </td> <td style=""> 608 </td> <td style=""> 608 </td> <td style=""> </td> </tr> <tr data-index="22"> <td style=""> &nbsp; </td> <td style=""> 8 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> MOR </td> <td style=""> <del>MOR</del> </td> <td style=""> Vertretung </td> <td style=""> POWIGK1 </td> <td style=""> POWIGK1 </td> <td style=""> 607 </td> <td style=""> 607 </td> <td style=""> </td> </tr> <tr data-index="23"> <td style=""> &nbsp; </td> <td style=""> 8 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> SEN </td> <td style=""> <del>SEN</del> </td> <td style=""> Vertretung </td> <td style=""> POWIbiE1 </td> <td style=""> POWIbiE1 </td> <td style=""> 609 </td> <td style=""> 609 </td> <td style=""> </td> </tr> <tr data-index="24"> <td style=""> &nbsp; </td> <td style=""> 8 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> MAU </td> <td style=""> <del>MAU</del> </td> <td style=""> Vertretung </td> <td style=""> POWIGK2 </td> <td style=""> POWIGK2 </td> <td style=""> 610 </td> <td style=""> 610 </td> <td style=""> </td> </tr> <tr data-index="25"> <td style=""> &nbsp; </td> <td style=""> 8 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> MEC </td> <td style=""> <del>MEC</del> </td> <td style=""> Vertretung </td> <td style=""> POWIGK3 </td> <td style=""> POWIGK3 </td> <td style=""> 614 </td> <td style=""> 614 </td> <td style=""> </td> </tr> <tr data-index="26"> <td style="" title="8 Stunde: Entfall von POWIGK4 bei &lt;del&gt;ULL&lt;/del&gt;"> &nbsp; </td> <td style=""> 8 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> </td> <td style=""> <del>ULL</del> </td> <td style=""> Entfall </td> <td style=""> POWIGK4 </td> <td style=""> POWIGK4 </td> <td style=""> </td> <td style=""> 612 </td> <td style=""> fällt aus </td> </tr> <tr data-index="27"> <td style=""> &nbsp; </td> <td style=""> 9 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> KAS </td> <td style=""> <del>KAS</del> </td> <td style=""> Vertretung </td> <td style=""> BIGK1 </td> <td style=""> BIGK1 </td> <td style=""> 408 </td> <td style=""> 408 </td> <td style=""> </td> </tr> <tr data-index="28"> <td style=""> &nbsp; </td> <td style=""> 9 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> SHE </td> <td style=""> <del>SHE</del> </td> <td style=""> Vertretung </td> <td style=""> CHGK1 </td> <td style=""> CHGK1 </td> <td style=""> 402 </td> <td style=""> 402 </td> <td style=""> </td> </tr> <tr data-index="29"> <td style=""> &nbsp; </td> <td style=""> 9 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> ALT </td> <td style=""> <del>ALT</del> </td> <td style=""> Vertretung </td> <td style=""> PHGK1 </td> <td style=""> PHGK1 </td> <td style=""> 411 </td> <td style=""> 411 </td> <td style=""> </td> </tr> <tr data-index="30"> <td style=""> &nbsp; </td> <td style=""> 9 </td> <td style=""> Q2b, Q2c, Q2d, Q2e, Q2f, Q2g, Q2h, Q2i </td> <td style=""> HAR </td> <td style=""> <del>HAR</del> </td> <td style=""> Vertretung </td> <td style=""> PHGK3 </td> <td style=""> PHGK3 </td> <td style=""> 412 </td> <td style=""> 412 </td> <td style=""> </td> </tr> </tbody> </table> </div> <div class="fixed-table-footer" style="display: none;"> <table> <tbody> <tr></tr> </tbody> </table> </div> <div class="fixed-table-pagination"> <div class="pull-left pagination-detail"> <span class="pagination-info">Zeige 1 bis 31 von 31 Zeilen</span> <span class="page-list"> <span class="btn-group dropup"> <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="page-size">All</span> <span class="caret"></span></button> <ul class="dropdown-menu" role="menu"> <li><a>15</a></li> <li><a>30</a></li> <li><a>50</a></li> </ul> </span> Einträge pro Seite </span> </div> <div class="pull-right pagination" style="display: none;"> <ul class="pagination"> <li class="page-pre"><a href="javascript:void(0)">‹</a></li> <li class="page-number active"><a>1</a></li> <li class="page-next"><a href="javascript:void(0)">›</a></li> </ul> </div> </div> </div> </div> <div class="clearfix"></div> <div class="pull-right"><i>Letzte Aktualisierung: 14.07.2023 um 13:32:38 Uhr</i></div> </div> </div> </div> <link rel="stylesheet" href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap-table.min.css"> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap-table.min.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap-table-de-DE.min.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap-table-export.js.Herunterladen"></script> <script type="text/javascript" src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/tableExport.min.js.Herunterladen"></script> <script type="text/javascript" src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/FileSaver.min.js.Herunterladen"></script> <script type="text/javascript" src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/html2canvas.min.js.Herunterladen"></script> <script type="text/javascript" src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jspdf.min.js.Herunterladen"></script> <script type="text/javascript" src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jspdf.plugin.autotable.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootstrap-table-cookie.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/bootbox.min.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/autoadmin.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/jquery.storageapi.min.js.Herunterladen"></script> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/my.js.Herunterladen"></script> <link href="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/my.css" type="text/css" media="screen" rel="stylesheet"> </div> <span class="hidden-print"><br><br></span> </div> </div> </div> <div class="hidden-print footer"> <div class="row visible-lg visible-md"> <div class="cold-md-12"> <table width="100%"> <tbody> <tr> <td width="50%"> <a href="https://start.schulportal.hessen.de/index.php"><img src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/logo-schulportal-footer.svg" width="160" height="29"></a> </td> <td style="text-align: right;" width="50%"> <a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userDSGVO">Datenschutz</a>&nbsp;|&nbsp;<a href="https://start.schulportal.hessen.de/verwaltung.php?a=impressum">Impressum</a> </td> </tr> </tbody> </table> </div> </div> <div class="row visible-sm visible-xs"> <div class="col-sm-12 col-xs-12" style="font-size: 8pt; text-align: center;"> <a href="https://start.schulportal.hessen.de/benutzerverwaltung.php?a=userDSGVO">Datenschutz</a>&nbsp;|&nbsp;<a href="https://start.schulportal.hessen.de/verwaltung.php?a=impressum">Impressum</a> </div> </div> </div> <script src="./Vertretungsplan - Schulportal Hessen - Pädagogische Organisation_files/pagemenue.js.Herunterladen"></script> <div id="desktopTest" class="hidden-xs"></div> </body> </html>';
                const datesWithValues = parseSubstitutionPlanHTML(vertretungsplanHTML);
                setFirstDate(datesWithValues.firstDateValues.date);
                setSubstitutionPlanEntriesOfFirstDate([...datesWithValues.firstDateValues.vertretungsplanEntries]);
                setSecondDate(datesWithValues.secondDateValues.date);
                setSubstitutionPlanEntriesOfSecondDate([...datesWithValues.secondDateValues.vertretungsplanEntries]);
                setLoading(false);                 
            })
            .catch((error: string) => {
                console.log(error);
                setLoading(false);
            });
    }, [sid]);

    return [ firstDate, substitutionPlanEntriesOfFirstDate, secondDate, substitutionPlanEntriesOfSecondDate, isLoading ];
}

function fetchSubstitutionPlanHTML(sid: string) {  
    if(!sid) {
      console.error("Sid is not set, which means that the user isn´t properly logged in.");
    }

    const vertretungsplanHTMLRequest = axios.get('https://start.schulportal.hessen.de/vertretungsplan.php', {
        headers: {
            'Cookie': 'sid=' + sid,
        },
        withCredentials: false  //if the credentials are sent in the Credential header and not the Cookie header, the server will respond with an error
    });
      
    return vertretungsplanHTMLRequest;
}