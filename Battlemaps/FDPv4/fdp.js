
/// <autosync enabled="true"/>

var editorPageName = "editor.html?v=2";

function initArray(length, value) {
    /// <summary>Créé et renvoie un tableau contenant length éléments et ayant chaque élément initialisé à value.
    var arr = [], i = 0;
    arr.length = length;
    while (i < length)
        arr[i++] = value;

    return arr;
}

var perso = {
    nom: "",
    img: "",
    classes: "",
    version: 2,
    cdp: "",
    race: "",
    sexe: "",
    ctaille: "4",
    religion: "",
    origine: "",
    age: "",
    poids: "",
    taille: "",
    align: "",
    joueur: "",
    md: "",
    partie: "",
    yeux: "",
    cheveux: "",
    peau: "",
    dextrie: "",
    noteidentité: "",
    forbase: "10",
    dexbase: "10",
    conbase: "10",
    intbase: "10",
    sagbase: "10",
    chabase: "10",
    force: "10",
    dex: "10",
    con: "10",
    int: "10",
    sag: "10",
    cha: "10",
    initdiv: "0",
    initnote: "",
    vd: "",
    vision: "",
    notesexplo: "",
    refbase: "0",
    refdiv: "0",
    refnote: "",
    vigbase: "0",
    vigdiv: "0",
    vignote: "",
    volbase: "0",
    voldiv: "0",
    volnote: "",
    notesjds: "",
    pv: "0",
    pvmax: "0",
    dgnl: "0",
    notespv: "",
    bba: "0",
    bmo: "+0",
    dmd: "10",
    ca: "",
    cacontact: "",
    casurpris: "",
    notescombat: "",
    notescombat2: "",
    armes: "",
    traits: "",
    cpmartiales: "",
    capacités: "",
    dons: "",
    languesbool: initArray(24, "0"),
    langues: "",
    notescapacités: "",

    //region compétences

    ///<field>nom des compétences.</field>
    cnom: initArray(42, ""),

    ///<field>rang de chaque compétence</field>
    crangs: initArray(42, "0"),

    cclasse: initArray(42, "0"),
    cdivers: initArray(42, "0"),
    cnote: initArray(42, "0"),

    notescompétences: "",

    //endregion
    sortsparjour: initArray(10, ""),
    sortsconnus: initArray(10, ""),
    dd: initArray(10, ""),
    domaines: "",
    sorts: "",
    notessorts: "",
    conc: "",
    notessortsniv: initArray(10, ""),
    snom: initArray(500, ""),
    snote: initArray(500, ""),
    sprep: initArray(500, "0"),
    slanc: initArray(500, "0"),
    surl: initArray(500, ""),
    parure: initArray(20, ""),
    poidsparure: initArray(20, "0"),
    objets: initArray(150, ""),
    poidsobjets: initArray(150, "0"),
    sacoches: initArray(6, ""),
    sacochescompte: initArray(6, "1"),
    maxdexarmure: "",
    pénalitéarmure: "",
    échecsortsarmure: "",
    maxdexbouclier: "",
    pénalitébouclier: "",
    échecsortsbouclier: "",
    richesses: "",
    poidsrichesses: "0",
    noteséquipement: "",
    compnom: "",
    comprelation: "",
    comprace: "",
    comptype: "",
    comptaille: "",
    compinit: "",
    compvd: "",
    compvision: "",
    idcomp1: "",
    compref: "",
    compvig: "",
    compvol: "",
    idcomp2: "",
    comppv: "",
    comppvmax: "",
    compdgnl: "",
    idcomp3: "",
    compfor: "",
    compdex: "",
    compcon: "",
    compint: "",
    compsag: "",
    compcha: "",
    compbba: "",
    compbmo: "",
    compdmd: "",
    compca: "",
    compcacontact: "",
    compcasurpris: "",
    idcomp4: "",
    idcomp5: "",
    idcomp6: "",
    idcomp7: "",
    idcomp8: "",
    notes: "",
    showmagie: "1",
    showcomp: "1",
    showmagempty: "1",
}

// <field>fiche du personnage</field>
var p = null;

var viewer = {
    tabc: "",

    tafs: 0,

    tastyle: "",

    /// <summary>Initialise la feuille de personnage à partir des données dans la fenêtre parente de l'iframe.</summary>
    initfdp: function () {
        p = jQuery.extend(true, {}, perso)

        // on récupère les données la page parente (on est dans une iframe)
        if (window.parent.pdesc) {
            p = jQuery.extend(true, p, window.parent.pdesc);
        }

        // migration
        viewer.migratePerso(p);

        viewer.tabc = window.parent.tabc || "#f3efe2";
        viewer.tafs = window.parent.tafs || 90;

        if (!p.showcomp) p.showcomp = "1";
        if (!p.showmagie) p.showmagie = "1";
        if (!p.showmagempty) p.showmagempty = "1";
        viewer.tastyle = " style='font-family: monospace; width: 100%; background-color: " + viewer.tabc + "; font-size: " + viewer.tafs + "%' ";
    },

    fdp: function () {
        //console.log("> fiche.fdp()");
        var popup = window.open(editorPageName, p.nom, 'scrollbars=yes,height=750,width=900,resizable=yes,directories=no,location=no,menubar=no,status=no,left=50,top=50', true);
        fiche.popup.window = popup;

        function doLoad() {
            //console.log("> doLoad()")
            fiche.popup.window.p = p;
            fiche.popup.doc = fiche.popup.window.document;
            var main = fiche.popup.main = fiche.popup.doc.getElementById("main");

            fiche.popup.window.start(fiche.tabc, fiche.tafs, p);

            /*
            var doc = $(fiche.popup.doc);

            //doc.getElementById("bIdent").onclick = fiche.bIdent;
            $("#bIdent", doc).on("click", function () { fiche.bIdent(); });

            //doc.getElementById("bCombat").onclick = fiche.bCombat;
            $("#bCombat", doc).on("click", function () { fiche.bCombat(); });

            //doc.getElementById("bCapac").onclick = fiche.bCapac;
            $("#bCapac", doc).on("click", function () { fiche.bCapac(); })

            //doc.getElementById("bComp").onclick = fiche.bComp;
            $("#bComp", doc).on("click", function () { fiche.bComp(); });

            //doc.getElementById("bMagie").onclick = fiche.bMagie;
            $("#bMagie", doc).on("click", function () { fiche.bMagie(); });

            //doc.getElementById("bEquip").onclick = fiche.bEquip;
            $("#bEquip", doc).on("click", function () { fiche.bEquip(); });

            //doc.getElementById("bCompa").onclick = fiche.bCompa;
            $("#bCompa", doc).on("click", function () { fiche.bCompa(); });

            //doc.getElementById("bNotes").onclick = fiche.bNotes;
            $("#bNotes", doc).on("click", function () { fiche.bNotes(); });

            //doc.getElementById("bCode").onclick = fiche.bCode;
            $("#bCode", doc).on("click", function () { fiche.onCodeButtonClick(); });

            //doc.getElementById("bWiki").onclick = new Function("window.open('http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG.MainPage.ashx','Wiki','scrollbars=yes,resizable=yes,directories=no,location=yes,menubar=yes,status=yes,left=50,top=50');");
            $("#bWiki", doc).on("click", function () {
                window.open('http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG.MainPage.ashx', 'Wiki', 'scrollbars=yes,resizable=yes,directories=no,location=yes,menubar=yes,status=yes,left=50,top=50');
            });

            fiche.affiche = 0;
            fiche.bIdent(doc);
            */
            //console.log("< doLoad()")

        }

        function load() {
            //console.log("> load()");
            var doc = fiche.popup.doc = fiche.popup.window.document;
            $(doc).ready(doLoad);
            //console.log("< load()");
        }

        // internet explorer ne permet pas de manipuler la popup tant qu'elle n'a pas été construite
        function tryLoad() {
            //console.log("> tryLoad()");
            var body = fiche.popup.window.document.getElementsByTagName("body");
            if (body[0] == null) {
                // not ready yet
                //console.log("not ready yet");
                setTimeout(tryLoad, 10);
            }
            else {
                load();
            }
            //console.log("< tryLoad()");
        }

        // Ce code fonctionnera uniquement avec chrome, firefox & cie
        $(popup).on("load", doLoad);

        // Ce code fonctionnera avec IE
        tryLoad();
    },

    migratePerso: function (data) {
        /// <summary>permet de migrer les données d'un personnage vers la dernière version</summary>
        /// <param name="data" type="perso">Données du personnage à migrer</param>
        var version = data.version || 1;

        if (version == 1) {
            // v2 : déplacement de la compétence désamorçage en sabotage// ancien vers nouveau :
            //      => 18 -> 38
            //      => si index entre 19 et 38 : -1
            // nouveau vers ancien
            //      => 38 -> 18
            //      => si index entre 18 et 37 : +1
            var move = function (array) {
                var sabotageItem = array[18];
                for (var i = 19; i <= 38; i++) {
                    array[i - 1] = array[i];
                }
                array[38] = sabotageItem;
            }

            // déplacement des données
            move(data.cnom);
            move(data.crangs)
            move(data.cclasse);
            move(data.cdivers);
            move(data.cnote);

            version++;
        }

        // Mise à jour version des données selon les migrations effectuées
        data.version = version;
    },

    elem: function (titre, val) {
        return "<li><b>" + titre + "</b> : " + val + "</li>";
    },

    // FDP WIKI
    titre: function (tit) {
        var res = "<div class='fdptab' id='t" + tit + "'>";
        res += "<table cellspacing=0 cellpadding=0>";
        return res;
    },

    ltitre: function (tit) {
        var res = "<li><a href='#t" + tit + "'>" + tit + "</a></li>";
        return res;
    },

    stitre: function (tit) {
        return "<p class='fdpst'>" + tit + "</p>";
    },

    stitresorts: function (tit) {
        return "<img class='btntogglesortsindisponibles' "
               + "src='http://www.pathfinder-fr.org/Wiki/public/upload/Battlemaps/Boutons/beye.jpg' "
               + "title='Afficher/masquer les sorts indisponibles'></img>"
               + "<p class='fdpst'>" + tit + "</p>";
    },

    tawiki: function (text) {
        if (text == "")
            return "";
        else {
            return "<p class='fdpta'>" + text.replace(/\n/g, "<br/>") + "</p>";
        }
    },

    affichewiki: function () {
        /// <summary>Construit le contenu HTML de la page du wiki avec les données du personnage.</summary>
        $("#fdpwikipic").attr("src", p.img);
        $("#fdpwikinom").html(p.nom);
        $("#fdpwikicol1").html(
          "<b>Joueur</b> : " + p.joueur + "<br/>" +
          "<b>MD</b> : " + p.md + "<br/>" +
          "<b>Partie</b> : " + p.partie + "<br/>"
        );

        $("#maintarget").append(ich.ficheTabs());
        var contenu = "";

        var signed = function (v) {
            return (v >= 0) ? "+" + v : v;
        }

        var withReturn = function (t) {
            if (!t)
                return "";
            return t.replace(/\n/g, "<br/>")
        }

        // Identité
        var buildCarac = function (c, b, v) {
            return {
                nom: c,
                base: b,
                valeur: v,
                modBase: function () { return statmodecho(b); },
                modValeur: function () { return statmodecho(v); },
            };
        };

        var viewIdentité = {
            // Race et classe
            race: p.race,
            sexe: p.sexe,
            catTailleIndex: p.ctaille,
            catTailles: ["Colossal (C)", "Gigantesque (Gig)", "Très Grand (TG)", "Grand (G)", "Moyen (M)", "Petit (P)", "Très Petit (TP)", "Minuscule (Min)", "Infime (I)"],
            catTaille: function () { return viewIdentité.catTailles[viewIdentité.catTailleIndex]; },
            classes: p.classes,
            prédilection: p.cdp,
            // Personalité
            religion: p.religion,
            origine: p.origine,
            alignement: p.alignement,
            dextrie: p.dextrie,
            // Caractéristiques,
            carac: [
                buildCarac("FOR", p.forbase, p.force),
                buildCarac("DEX", p.dexbase, p.dex),
                buildCarac("CON", p.conbase, p.con),
                buildCarac("INT", p.intbase, p.int),
                buildCarac("SAG", p.sagbase, p.sag),
                buildCarac("CHA", p.chabase, p.cha),
            ],
            // Description
            age: p.age,
            poids: p.poids,
            taille: p.taille,
            yeux: p.yeux,
            cheveux: p.cheveux,
            peau: p.peau,
            // notes
            notes: withReturn(p.noteidentité)
        };

        $("#maintarget").append(ich.ficheTabIdentité(viewIdentité));

        // Combat
        var buildSave = function (nom, base, carac, nomCarac, div, note) {
            return {
                nom: nom,
                val: signed(base + statmod(carac) + div),
                base: signed(base),
                carac: signed(statmod(carac)),
                nomCarac: nomCarac,
                div: signed(div),
                note: function () { return (note == "") ? "" : "(" + note + ")"; }
            };
        };

        var viewCombat = {
            // Exploration
            initiative: statmod(p.dex) + parseInt(p.initdiv),
            initmoddex: statmod(p.dex),
            initdiv: parseInt(p.initdiv),
            initnotetext: withReturn(p.initnote),
            initnote: function () {
                if (viewCombat.initnotetext == "")
                    return "";
                return "(" + viewCombat.initnotetext + ")";
            },
            vd: p.vd,
            vision: p.vision,
            notesexplo: withReturn(p.notesexplo),
            // Jets de sauvegarde
            saveRef: buildSave("Réflexes", parseInt(p.refbase), parseInt(p.dex), "Dex", parseInt(p.refdiv), p.refnote),
            saveVig: buildSave("Vigueur", parseInt(p.vigbase), parseInt(p.con), "Con", parseInt(p.vigdiv), p.vignote),
            saveVol: buildSave("Volonté", parseInt(p.volbase), parseInt(p.sag), "Sag", parseInt(p.voldiv), p.volnote),
            notejds: withReturn(p.notejds),
            // Points de vie
            pv: p.pv,
            pvmax: p.pvmax,
            dgnl: p.dgnl,
            notespv: withReturn(p.notespv),
            // Valeurs de combat
            bba: signed(p.bba),
            bmo: signed(parseInt(p.bmo)),
            dmd: p.dmd,
            ca: p.ca,
            camax: p.camax,
            cacontact: p.cacontact,
            casurpris: p.casurpris,
            notescombat: withReturn(p.notescombat),
            // Armes et modes d'attaques
            armes: withReturn(p.armes),
            // Notes
            notescombat2: withReturn(p.notescombat2),
        };

        $("#maintarget").append(ich.ficheTabCombat(viewCombat));

        $("#fdpwikicol2").append(ich.summary2Col({
            ref: viewCombat.saveRef.val,
            vig: viewCombat.saveVig.val,
            vol: viewCombat.saveVol.val,
        }));

        $("#fdpwikicol3").append(ich.summary3Col({
            pv: viewCombat.pv,
            pvmax: viewCombat.pvmax,
            ca: viewCombat.ca,
            cacontact: viewCombat.cacontact,
            casurpris: viewCombat.casurpris,
            bmo: viewCombat.bmo,
            dmd: viewCombat.dmd,
        }));

        // Capacités
        var getLangues = function (languesBits) {
            var langues = "";
            for (var i = 0; i < fiche.lgtab.length; i++) {
                if (languesBits[i] == "1") {
                    langues += ", " + fiche.lgtab[i];
                }
            }

            if (langues != "")
                langues = langues.substring(2);

            return langues;
        };


        var viewCapacités = {
            traits: withReturn(p.traits),
            cpmartiales: withReturn(p.cpmartiales),
            capacités: withReturn(p.capacités),
            dons: withReturn(p.dons),
            languesList: getLangues(p.languesbool),
            langues: withReturn(p.langues),
            notescapacités: withReturn(p.notescapacités)
        };

        $("#maintarget").append(ich.ficheTabCapacités(viewCapacités));

        // Compétences
        var viewCompetences = {
            comp1: [],
            comp2: [],
            notes: withReturn(p.notescompétences),
        }

        // colonne de compétences
        var compCol = viewCompetences.comp1;
        var index = 0;
        for (var i = 0; i < fiche.competences.length; i++) {

            var comp = fiche.competences[i];
            /*
            var nom = fiche.ctab[i];
            var inne = (nom.substring(0, 1) == "I");
            if (inne)
                nom = nom.substring(1);
            var cstat = parseInt(nom.substring(0, 1));
            var ajout = (nom.substring(1, 2) == '*');
            nom = nom.substring(ajout ? 2 : 1);
            var pos = nom.indexOf("!");
            */
            var nom = comp.nom || comp.id;
            var url = "http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG." + (comp.wiki || comp.nom || comp.id) + ".ashx";
            if (comp.choix || false) {
                nom += " (" + p.cnom[i] + ")";
            }

            if (i >= fiche.competences.length / 2 && index == i) {
                compCol = viewCompetences.comp2;
                index = 0;
            }

            var rangs = parseInt(p.crangs[i]);
            var val = rangs;

            var entraine = (val > 0);
            comm = fiche.commpre + " = " + rangs + " rg";
            if (rangs > 1)
                comm += "s";
            comm += " ";
            switch (comp.ability) {
                case 1: val += statmod(p.force); comm += zaffiche(statmod(p.force)) + " For "; break;
                case 2: val += statmod(p.dex); comm += zaffiche(statmod(p.dex)) + " Dex "; break;
                case 3: val += statmod(p.con); comm += zaffiche(statmod(p.con)) + " Con "; break;
                case 4: val += statmod(p.int); comm += zaffiche(statmod(p.int)) + " Int "; break;
                case 5: val += statmod(p.sag); comm += zaffiche(statmod(p.sag)) + " Sag "; break;
                case 6: val += statmod(p.cha); comm += zaffiche(statmod(p.cha)) + " Cha "; break;
            }

            if (entraine && p.cclasse[i] == '1') {
                val += 3;
                comm += " +3 ";
            }

            val = val + parseInt(p.cdivers[i]);
            comm += zaffiche(parseInt(p.cdivers[i])) + fiche.commpost;
            var util = comp.inne || entraine;
            var penarm = comp.ability == 2 || comp.ability == 1;
            val = (util ? "" : "(") + zaffiche(val) + (penarm ? "*" : "") + (util ? "" : ")");
            if (p.cnote[i] != "")
                val += " (" + p.cnote[i] + ")";

            compCol[index] = {
                url: url,
                nom: nom,
                val: val,
                comm: comm
            };

            index++;
        }

        $("#maintarget").append(ich.ficheTabCompétences(viewCompetences));

        // Magie
        if (p.showmagie == "1") {

            var viewMagie = {

            };

            contenu += viewer.titre("Magie");
            contenu += "<tr>";
            contenu += "<td width='50%'>";
            contenu += viewer.stitre("Sorts");
            contenu += "<b>Concentration :</b> " + p.conc + "<br/>";
            contenu += viewer.tawiki(p.notessorts);
            contenu += "</td><td width='50%' rowspan='2'>";
            contenu += viewer.stitre("Domaines, écoles, lignages");
            contenu += viewer.tawiki(p.domaines);
            contenu += "</td></tr>";
            contenu += "<tr><td>";
            contenu += viewer.stitre("Notes");
            contenu += viewer.tawiki(p.sorts);
            contenu += "</td></tr>";
            for (var i = 0; i < 10; i++) {
                if (i % 2 == 0)
                    contenu += "</tr><tr>";
                var lsorts = "";
                var nprep = 0;
                var nlanc = 0;
                for (var j = i * 50; j < 50 * (i + 1) ; j++)
                    if (arrayget(p.snom, j) != "") {
                        var np = parseInt(arrayget(p.sprep, j));
                        var nl = parseInt(arrayget(p.slanc, j));
                        lsorts += "<li";
                        if (np == 0 || nl == np)
                            lsorts += " class='pasdisp'";
                        lsorts += ">";
                        if (arrayget(p.surl, j) != "")
                            lsorts += "<a href='" + arrayget(p.surl, j) + "' target='blank'><i>" + arrayget(p.snom, j) + "</i></a>";
                        else
                            lsorts += "<i>" + arrayget(p.snom, j) + "</i>";
                        lsorts += " : " + np + " préparé" + (np > 1 ? "s" : "");
                        lsorts += ", " + nl + " lancé" + (nl > 1 ? "s" : "");
                        if (arrayget(p.snote, j) != "")
                            lsorts += " (" + arrayget(p.snote, j) + ")";
                        lsorts += "</li>";
                        nprep += np;
                        nlanc += nl;
                    }
                if (lsorts == "")
                    lsorts = "Aucun sort<br/>";
                else
                    lsorts = "<ul>" + lsorts + "</ul>";
                if ((p.showmagempty == "1") || (lsorts != "Aucun sort<br/>")) {
                    contenu += "<td>";
                    contenu += viewer.stitresorts("Niveau " + i + " (DD " + arrayget(p.dd, i) + ")");
                    contenu += "<b>Sorts connus</b> : " + arrayget(p.sortsconnus, i) + "<br/>";
                    contenu += "<b>Sorts par jour</b> : " + arrayget(p.sortsparjour, i) + " (";
                    contenu += nprep + " préparé" + (nprep > 1 ? "s" : "") + ", ";
                    contenu += nlanc + " lancé" + (nlanc > 1 ? "s" : "") + ")<br/>";
                    contenu += lsorts;
                    if (arrayget(p.notessortsniv, i) != "")
                        contenu += viewer.tawiki(arrayget(p.notessortsniv, i));
                    contenu += "</td>";
                }
            }
            contenu += "</tr></table></div>";
        }

        // Equipement
        contenu += viewer.titre("Équipement");
        var totpds = 0.0;
        contenu += "<tr>";
        contenu += "<td rowspan='2' width='50%'>";
        var cpds = 0.0;
        var lequip = "<ul>";
        for (var i = 0; i < fiche.ptab.length; i++) {
            if (arrayget(fiche.ptab, i).substring(0, 1) != "*") {
                lequip += "<li><b>" + arrayget(fiche.ptab, i) + " :</b> " + arrayget(p.parure, i) + " (" + arrayget(p.poidsparure, i) + "kg";
                if (arrayget(fiche.ptab, i) == "Armure")
                    lequip += ", MaxDex " + p.maxdexarmure + ", Pénal " + p.pénalitéarmure + ", Éch sorts " + p.échecsortsarmure;
                if (arrayget(fiche.ptab, i) == "Bouclier")
                    lequip += ", MaxDex " + p.maxdexbouclier + ", Pénal " + p.pénalitébouclier + ", Éch sorts " + p.échecsortsbouclier;
                lequip += ")</li>";
            }
            cpds += parseFloat(arrayget(p.poidsparure, i));
        }
        contenu += viewer.stitre("Sur le corps (" + cpds + " kg)") + lequip + "</ul>";
        totpds += cpds;
        contenu += "</td><td width='50%'>";
        contenu += viewer.stitre("Richesses (" + p.poidsrichesses + " kg)");
        contenu += viewer.tawiki(p.richesses) + "</td>";
        totpds += parseFloat(p.poidsrichesses);
        contenu += "</td></tr><td>";
        contenu += viewer.stitre("Notes");
        contenu += viewer.tawiki(p.noteséquipement) + "</td>";
        contenu += "</td>";
        for (var i = 0; i < 6; i++) {
            lequip = "";
            cpds = 0;
            for (var j = 25 * i; j < 25 * (i + 1) ; j++) {
                if ((arrayget(p.objets, j) != "") || (arrayget(p.poidsobjets, j) != "0"))
                    lequip += "<li>" + arrayget(p.objets, j) + " (" + arrayget(p.poidsobjets, j) + " kg)</li>";
                cpds += parseFloat(arrayget(p.poidsobjets, j));
            }
            if (lequip == "")
                lequip = "Aucun objet";
            else
                lequip = "<ul>" + lequip + "</ul>";
            if (i % 2 == 0)
                contenu += "</tr><tr>";
            contenu += "<td>";
            var stit = "Sac #" + (i + 1) + " : " + arrayget(p.sacoches, i) + " (" + cpds + " kg";
            if (arrayget(p.sacochescompte, i) == "0")
                stit += ", pds non compté";
            else
                totpds += cpds;
            stit += ")";
            contenu += viewer.stitre(stit) + lequip + "</td>";
        }
        contenu += "</tr>";
        totpds = Math.round(totpds * 100) / 100;
        contenu += "<tr><td colspan='2'>" + viewer.stitre("Poids total");
        contenu += "<b>" + totpds + " kg</b>";
        var forc = parseInt(p.force);
        var mult = 1;
        while (forc > 29) {
            forc = forc - 10;
            mult = mult * 4;
        }
        var chm = parseFloat(arrayget(fiche.chmoytab, forc - 1)) * mult * arrayget(fiche.chmodtailletab, parseInt(p.ctaille));
        var chl = parseFloat(arrayget(fiche.chloutab, forc - 1)) * mult * arrayget(fiche.chmodtailletab, parseInt(p.ctaille));
        var chx = parseFloat(arrayget(fiche.chmaxtab, forc - 1)) * mult * arrayget(fiche.chmodtailletab, parseInt(p.ctaille));
        if (totpds < chm)
            contenu += " charge légère (pas de pénalité)";
        else if (totpds < chl)
            contenu += " charge moyenne (Max Dex +3, pénalité -3, course ×4, VD réduite)";
        else if (totpds < chx)
            contenu += " charge lourde (Max Dex +1, pénalité -6, course ×3, VD réduite)";
        else
            contenu += " charge extrême (ne peut se déplacer)";
        contenu += "</td></tr></table></div>";

        // Compagnon
        if (p.showcomp == "1") {
            contenu += viewer.titre("Compagnon");
            contenu += "<tr>";
            contenu += "<td width='33%'>";
            contenu += viewer.stitre("Identité") + "<ul>";
            contenu += viewer.elem("Nom", p.compnom);
            contenu += viewer.elem("Relation", p.comprelation);
            contenu += viewer.elem("Race", p.comprace);
            contenu += viewer.elem("Type", p.comptype);
            contenu += viewer.elem("Taille", p.comptaille);
            contenu += "</ul>";
            contenu += "</td><td width='33%'>";
            contenu += viewer.stitre("Exploration") + "<ul>";
            contenu += viewer.elem("Init", p.compinit);
            contenu += viewer.elem("VD", p.compvd);
            contenu += viewer.elem("Vision", p.compvision);
            contenu += "</ul>";
            contenu += viewer.tawiki(p.idcomp1);
            contenu += "</td><td width='33%'>";
            contenu += viewer.stitre("Jets de sauvegarde") + "<ul>";
            contenu += viewer.elem("Réf", p.compref);
            contenu += viewer.elem("Vig", p.compvig);
            contenu += viewer.elem("Vol", p.compvol);
            contenu += "</ul>";
            contenu += viewer.tawiki(p.idcomp2);
            contenu += "</td></tr><tr><td>";
            contenu += viewer.stitre("Caractéristiques") + "<ul>";
            contenu += viewer.elem("For", p.compfor);
            contenu += viewer.elem("Dex", p.compdex);
            contenu += viewer.elem("Con", p.compcon);
            contenu += viewer.elem("Int", p.compint);
            contenu += viewer.elem("Sag", p.compsag);
            contenu += viewer.elem("Cha", p.compcha);
            contenu += "</td><td>";
            contenu += viewer.stitre("Valeurs de combat") + "<ul>";
            contenu += viewer.elem("BBA", p.compbba);
            contenu += viewer.elem("BMO", p.compbmo);
            contenu += viewer.elem("DMD", p.compdmd);
            contenu += viewer.elem("CA", p.compca);
            contenu += viewer.elem("CA contact", p.compcacontact);
            contenu += viewer.elem("CA surpris", p.compcasurpris);
            contenu += "</td><td>";
            contenu += viewer.stitre("Points de vie") + "<ul>";
            contenu += viewer.elem("pv actuels", p.comppv);
            contenu += viewer.elem("pv max", p.comppvmax);
            contenu += viewer.elem("Dg non létaux", p.compdgnl);
            contenu += "</ul>";
            contenu += viewer.tawiki(p.idcomp3);
            contenu += "</td></tr><tr><td>";
            contenu += viewer.stitre("Compétences");
            contenu += viewer.tawiki(p.idcomp5);
            contenu += "</td><td colspan='2'>";
            contenu += viewer.stitre("Attaques");
            contenu += viewer.tawiki(p.idcomp4);
            contenu += "</td></tr><tr><td>";
            contenu += viewer.stitre("Dons");
            contenu += viewer.tawiki(p.idcomp6);
            contenu += "</td><td colspan='2'>";
            contenu += viewer.stitre("Capacités spéciales");
            contenu += viewer.tawiki(p.idcomp7);
            contenu += "</td></tr><tr><td colspan='3'>";
            contenu += viewer.stitre("Notes");
            contenu += viewer.tawiki(p.idcomp8);
            contenu += "</td></tr></table></div>";
        }

        // Notes
        contenu += viewer.titre("Notes");
        contenu += "<tr><td width='100%'>" + viewer.tawiki(p.notes) + "</td></tr></table></div>";
        $("#maintarget").append(contenu);
        $("#maintarget").tabs();

        $(".btntogglesortsindisponibles").click(
          function () { $(".pasdisp").toggle(); }
        );
    },

    initbutton: function (el, tai) {
        $(el)
            .attr("src", "http://www.pathfinder-fr.org/Wiki/public/Upload/Battlemaps/Boutons/" + $(el).attr("data-pic") + ".jpg")
            .css("width", "" + tai + "px")
            .css("padding", "2px")
            .css("border", "0");

        if ($(el).attr("id") != "bgrille") {
            $(el)
                .mouseover(function () { $(el).css("padding", "0px"); $(el).css("border", "2px solid #e7dfc6"); })
                .mouseout(function () { $(el).css("padding", "2px"); $(el).css("border", "0"); });
        }

        if ($(el).attr("data-act")) {
            $(el).click(new Function($(el).attr("data-act")));
        }
    },

    balise: function () {
        $("#tr_balise").toggle()
    },
};

/* Initialise la fiche de personnages modifiable */
var fiche = {
    competences: [
        { id: "Acrobaties", inne: true, ability: 2 },
        { id: "Art de la magie", ability: 4 },
        { id: "Artisanat 1", nom: "Artisanat", inne: true, ability: 4, choix: true },
        { id: "Artisanat 2", nom: "Artisanat", inne: true, ability: 4, choix: true },
        { id: "Bluff", inne: true, ability: 6 },
        { id: "Conn (donjons)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (géographie)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (histoire)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (ingénierie)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (local)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (mystères)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (nature)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (noblesse)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (plans)", wiki: "Connaissances", ability: 4 },
        { id: "Conn (religion)", wiki: "Connaissances", ability: 4 },
        { id: "Conn 1", nom: "Connaissances", choix: true, ability: 4 },
        { id: "Conn 2", nom: "Connaissances", choix: true, ability: 4 },
        { id: "Déguisement", inne: true, ability: 6 },
        { id: "Diplomatie", inne: true, ability: 6 },
        { id: "Discrétion", inne: true, ability: 2 },
        { id: "Dressage", ability: 6 },
        { id: "Équitation", inne: true, ability: 2 },
        { id: "Escalade", inne: true, ability: 2 },
        { id: "Escamotage", ability: 2 },
        { id: "Estimation", inne: true, ability: 4 },
        { id: "Évasion", inne: true, ability: 2 },
        { id: "Intimidation", inne: true, ability: 6 },
        { id: "Linguistique", ability: 4 },
        { id: "Natation", inne: true, ability: 1 },
        { id: "Perception", inne: true, ability: 5 },
        { id: "Premiers secours", inne: true, ability: 5 },
        { id: "Prof 1", name: "Profession", choix: true, ability: 5 },
        { id: "Prof 2", name: "Profession", choix: true, ability: 5 },
        { id: "Psychologie", inne: true, ability: 5 },
        { id: "Repr 1", name: "Représentation", inne: true, choix: true, ability: 6 },
        { id: "Repr 2", name: "Représentation", inne: true, choix: true, ability: 6 },
        { id: "Repr 3", name: "Représentation", inne: true, choix: true, ability: 6 },
        { id: "Repr 4", name: "Représentation", inne: true, choix: true, ability: 6 },
        { id: "Sabotage", ability: 2 },
        { id: "Survie", inne: true, ability: 5 },
        { id: "Utilisation d'objets magiques", nom: "Utilisation d'OM", wiki: "Utilisation dobjets magiques", ability: 6 },
        { id: "Vol", ability: 2, inne: true },
    ],

    /// <field>Tableau des compétences</field>
    ctab: [
        "I2Acrobaties!Acrobaties",
        "4Art de la magie!Art de la magie",
        "I4*Artis!Artisanat",
        "I4*Artis!Artisanat",
        "I6Bluff!Bluff",
        "4Conn (donjons)!Connaissances",
        "4Conn (géographie)!Connaissances",
        "4Conn (histoire)!Connaissances",
        "4Conn (ingénierie)!Connaissances",
        "4Conn (local)!Connaissances",
        "4Conn (mystères)!Connaissances",
        "4Conn (nature)!Connaissances",
        "4Conn (noblesse)!Connaissances",
        "4Conn (plans)!Connaissances",
        "4Conn (religion)!Connaissances",
        "4*Conn!Connaissances",
        "4*Conn!Connaissances",
        "I6Déguisement!Déguisement",
        "I6Diplomatie!Diplomatie",
        "I2Discrétion!Discrétion",
        "6Dressage!Dressage",
        "I2Équitation!Équitation",
        "I1Escalade!Escalade",
        "2Escamotage!Escamotage",
        "I4Estimation!Estimation",
        "I2Évasion!Évasion",
        "I6Intimidation!Intimidation",
        "4Linguistique!Linguistique",
        "I1Natation!Natation",
        "I5Perception!Perception",
        "I5Premiers secours!Premiers secours",
        "5*Prof!Profession",
        "5*Prof!Profession",
        "I5Psychologie!Psychologie",
        "I6*Repr!Représentation",
        "I6*Repr!Représentation",
        "I6*Repr!Représentation",
        "I6*Repr!Représentation",
        "2Sabotage!Sabotage",
        "I5Survie!Survie",
        "6Utilisation d'OM!Utilisation dobjets magiques",
        "I2Vol!Vol"
    ],

    /// <field>Nombre de compétences. Longueur du champ ctab.</field>
    // remplacé par fiche.ctab.length
    //cl: 0,

    /// <field>Tableau des classes reconnues.</field>
    classestab: ["Alchimiste", "Barbare", "Barde", "Chevalier", "Conjurateur", "Druide", "Ensorceleur", "Guerrier", "Inquisiteur",
          "Magicien", "Moine", "Oracle", "Paladin", "Prêtre", "Rôdeur", "Roublard", "Sorcière"],

    /// <field>Comptétences de classe pour chaque classe.</field>
    compclasse: {
        Alchimiste: [1, 2, 3, 10, 11, 23, 24, 29, 30, 31, 32, 38, 39, 40, 41],
        Barbare: [0, 2, 3, 11, 20, 21, 22, 26, 28, 29, 39],
        Barde: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 29, 31, 32, 33, 34, 35, 36, 37, 40],
        Chevalier: [2, 3, 4, 18, 20, 21, 22, 26, 28, 31, 32, 33],
        Conjurateur: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 27, 31, 32, 40, 41],
        Druide: [1, 2, 3, 6, 11, 20, 21, 22, 28, 29, 30, 31, 32, 39, 41],
        Ensorceleur: [1, 2, 3, 4, 10, 24, 26, 31, 32, 40, 41],
        Guerrier: [2, 3, 5, 8, 20, 21, 22, 26, 28, 31, 32, 39],
        Inquisiteur: [1, 2, 3, 4, 5, 10, 11, 13, 14, 17, 18, 19, 21, 22, 26, 28, 29, 30, 31, 32, 33, 39],
        Magicien: [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 24, 27, 31, 32, 41],
        Moine: [0, 2, 3, 7, 14, 19, 21, 22, 25, 26, 28, 29, 31, 32, 33, 34, 35, 36, 37],
        Oracle: [1, 2, 3, 7, 13, 14, 18, 30, 31, 32, 33],
        Paladin: [1, 2, 3, 12, 14, 18, 20, 21, 30, 31, 32, 33],
        Prêtre: [1, 2, 3, 7, 10, 12, 13, 14, 18, 24, 27, 30, 31, 32, 33],
        Rôdeur: [1, 2, 3, 5, 6, 11, 19, 20, 21, 22, 26, 28, 29, 30, 31, 32, 39],
        Roublard: [0, 2, 3, 4, 5, 9, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37, 38, 40],
        Sorcière: [1, 2, 3, 7, 10, 11, 13, 26, 30, 31, 32, 40, 41],
    },

    /// <field>Langues</field>
    lgtab: ["*Races", "Commun", "Elfique", "Gnome", "Halfling", "Nain", "*Classes", "Druidique", "*Monstres", "Draconique", "Géant",
          "Gnoll", "Gobelin", "Orque", "Profondeurs", "Sylvestre", "*Extérieurs", "Abyssal", "Aérien", "Aquatique", "Céleste", "Igneux",
          "Infernal", "Terreux"],

    /// <field>Nombre de langues</field>
    // remplacé par fiche.lgtab.length
    //lgl: 0,

    /// <field>Emplacements d'objets portés</field>
    ptab: ["*Sur la tête", "Tête", "Front", "Yeux", "*Bras et mains", "Poignets", "Mains", "Anneau", "Anneau", "*Vêtements", "Épaules",
          "Corps", "Torse", "*Autre", "Cou", "Taille", "Pieds", "*Armure et bouclier", "Armure", "Bouclier"],

    /// <field>Nombre d'emplacement d'objets portés</field>
    // remplacé par fiche.ptab.length
    //pl: 0,

    /// <field>Charges moyennes selon le score de force.</field>
    chmoytab: [1.5, 3, 5, 6.5, 8, 10, 11.5, 13, 15, 17.5, 19, 21.5, 25, 29, 33, 38, 43, 50, 58, 66.5, 76.5, 86.5, 100, 116.5, 133, 153, 173, 200, 233],

    /// <field>Charges lourdes selon le score de force.</field>
    chloutab: [3, 6.5, 10, 13, 16.5, 20, 23, 26.5, 30, 33, 38, 43, 50, 58, 66.5, 76.5, 86.5, 100, 116.5, 133, 153, 173, 200, 233, 266.5, 306.5, 346.5, 400, 466.5],

    /// <field>Charges max selon le score de force.</field>
    chmaxtab: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 57.5, 65, 75, 87.5, 100, 115, 130, 150, 175, 200, 230, 260, 300, 350, 400, 460, 520, 600, 700],

    /// <field>Modificateurs de taille</field>
    chmodtailletab: [16.0, 8.0, 4.0, 2.0, 1.0, 0.75, 0.5, 0.25, 0.125],

    /// <field>personnage</field>
    p: null,

    /// <field>Nom des propriétés de la classe perso contenant les caractéristiques de base</field>
    stbtab: ["forbase", "dexbase", "conbase", "intbase", "sagbase", "chabase"],

    /// <field>Nom des propriétés de la classe perso contenant les caractéristiques courantes</field>
    sttab: ["force", "dex", "con", "int", "sag", "cha"],

    /// <field Type='Number'>Index de l'onglet actuellement affiché.</field>
    affiche: 0,

    /// <field>Référence vers la fenêtre fille contenant la fiche en mode édition.</field>
    popup: {
        /// <field Type='Window'>Fenêtre popup.</field>
        window: null,

        /// <field Type='Node'>Document de la fenêtre popup. Equivalent à window.popup.</field>
        doc: null,

        /// <field Type='HTMLElement'>DOMElement Main de la fenêtre popup.</field>
        main: null,
    },

    tabc: "",

    tafs: 0,

    tastyle: "",

    commpre: "<span style='color: gray; font-style: italic'>",

    commpost: "</span>",

    /// <summary>Initialise la feuille de personnage à partir des données dans la fenêtre parente de l'iframe.</summary>
    initfdp: function (x_tabc, x_tafs, x_p) {
        //p = jQuery.extend(true, {}, perso)
        //var pdesc = window.parent.pdesc;

        // HACK on replace certaines valeurs de chaînes de caractères qui ont été encodées pour le stockage
        //pdesc = pdesc.replace(/00LBR00/g, "\u005b").replace(/00RBR00/g, "\u005d").replace(/00GUI00/g, "'").replace(/00LCB00/g, "\{");

        //if (window.parent.pdesc) {
        //p = jQuery.extend(true, p, window.parent.pdesc);
        //}

        // migration
        //fiche.migratePerso(p);
        fiche.popup.doc = document;
        fiche.popup.window = window;

        p = x_p;
        fiche.tabc = x_tabc || "#f3efe2";
        fiche.tafs = x_tafs || 90;

        if (!p.showcomp) p.showcomp = "1";
        if (!p.showmagie) p.showmagie = "1";
        if (!p.showmagempty) p.showmagempty = "1";
        fiche.tastyle = " style='font-family: monospace; width: 100%; background-color: " + fiche.tabc + "; font-size: " + fiche.tafs + "%' ";
    },

    start: function () {
        var main = fiche.popup.main = fiche.popup.doc.getElementById("main");
        var doc = $(fiche.popup.doc);

        //doc.getElementById("bIdent").onclick = fiche.bIdent;
        $("#bIdent", doc).on("click", function () { fiche.bIdent(); });

        //doc.getElementById("bCombat").onclick = fiche.bCombat;
        $("#bCombat", doc).on("click", function () { fiche.bCombat(); });

        //doc.getElementById("bCapac").onclick = fiche.bCapac;
        $("#bCapac", doc).on("click", function () { fiche.bCapac(); })

        //doc.getElementById("bComp").onclick = fiche.bComp;
        $("#bComp", doc).on("click", function () { fiche.bComp(); });

        //doc.getElementById("bMagie").onclick = fiche.bMagie;
        $("#bMagie", doc).on("click", function () { fiche.bMagie(); });

        //doc.getElementById("bEquip").onclick = fiche.bEquip;
        $("#bEquip", doc).on("click", function () { fiche.bEquip(); });

        //doc.getElementById("bCompa").onclick = fiche.bCompa;
        $("#bCompa", doc).on("click", function () { fiche.bCompa(); });

        //doc.getElementById("bNotes").onclick = fiche.bNotes;
        $("#bNotes", doc).on("click", function () { fiche.bNotes(); });

        //doc.getElementById("bCode").onclick = fiche.bCode;
        $("#bCode", doc).on("click", function () { fiche.onCodeButtonClick(); });

        //doc.getElementById("bWiki").onclick = new Function("window.open('http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG.MainPage.ashx','Wiki','scrollbars=yes,resizable=yes,directories=no,location=yes,menubar=yes,status=yes,left=50,top=50');");
        $("#bWiki", doc).on("click", function () {
            window.open('http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG.MainPage.ashx', 'Wiki', 'scrollbars=yes,resizable=yes,directories=no,location=yes,menubar=yes,status=yes,left=50,top=50');
        });

        fiche.affiche = 0;
        fiche.bIdent(doc);
    },

    balise_actualiser: function () {
        var bal = "[jeton";
        if ($("#balaligng").attr("checked"))
            bal += "g";
        else
            bal += "d";
        if ($("#ballienimage").attr("checked"))
            bal += '!a:' + document.referrer;
        if ($("#balaffichernom").attr("checked")) {
            bal += '=';
            if ($("#balcoulnom").val() != '') {
                bal += '[st=' + $("#balcoulnom").val();
                if ($("#balcoulsur").val() != '')
                    bal += '/' + $("#balcoulsur").val();
                bal += "]"
            }
            bal += p.nom;
            if ($("#balcoulnom").val() != '')
                bal += "[/st]";
        }
        if ($("#balafficherpv").attr("checked"))
            bal += "!p:" + p.pv + "/" + p.pvmax;
        bal += ']' + p.img;
        bal += "[/jeton]";
        $("#baltext").val(bal);
    },

    bwikiset: function () {
        /// <summary>Transforme toutes les images de lien vers le wiki en bouton cliquable ouvrant la bonne fenêtre
        var doc = fiche.popup.doc;

        $.each($("img.bwikilink", doc), function (i, img) {
            // récupération url
            var url = $(img).attr("data-url");
            if (url.substring(0, 4) !== "http") {
                url = "http://www.pathfinder-fr.org/Wiki/" + url;
            }

            // ajout évènement click
            $(img).on("click", function () {
                window.open(url, "wiki", "scrollbars=yes,resizable=yes,directories=no,location=no,menubar=no,status=no,left=50,top=50");
            });
        });
    },

    bIdent: function () {
        var doc = fiche.popup.doc;
        if (!p.ctaille)
            p.ctaille = "4";
        var main = $("#main", doc);
        fiche.sauve();
        vide(main);
        fiche.affiche = 1;
        main.css("border", "1px solid #3b3124");

        var makeStat = function (abbr, i, name) {
            /// <summary>Renvoie les données pour une statistique</summary>
            return {
                i: i,
                abbr: abbr,
                wiki: function () { return bwiki("Pathfinder-RPG." + name + ".ashx"); },
                bb: function () { return butpm("bb-plus-" + i, "bb-moins-" + i); },
                b: function () { return butpme("b-plus-" + i, "b-moins-" + i, "b-egal-" + i); },
            };
        }

        // données de la vue
        var view = {
            classes: function () { return bwiki("Pathfinder-RPG.Classes.ashx"); },
            age: function () { return bwiki("Pathfinder-RPG.%C3%89tat%20civil%20et%20mensurations.ashx#AGE"); },
            poids: function () { return bwiki("Pathfinder-RPG.%C3%89tat%20civil%20et%20mensurations.ashx#TAILLEPOIDS"); },
            taille: function () { return bwiki("Pathfinder-RPG.%C3%89tat%20civil%20et%20mensurations.ashx#TAILLEPOIDS"); },
            alignement: function () { return bwiki("Pathfinder-RPG.Alignement.ashx"); },
            stats: [
                makeStat("FOR", 0, "Force"),
                makeStat("DEX", 1, "Dextérité"),
                makeStat("CON", 2, "Constitution"),
                makeStat("INT", 3, "Intelligence"),
                makeStat("SAG", 4, "Sagesse"),
                makeStat("CHA", 5, "Charisme"),
            ],
            tastyle: fiche.tastyle
        };

        $(main).html(ich.editorIdentTab(view));

        fiche.bwikiset();

        //doc.getElementById("idimg").onclick = fiche.modimg;
        $("#idimg", doc)
            .attr("src", p.img)
            .on("click", function () {
                var nsrc = fiche.popup.window.prompt("Entrez l'adresse de la nouvelle image.", p.img);
                if (nsrc != null) {
                    p.img = nsrc;
                    $("#idimg", doc).attr("src", nsrc);
                }
            });

        //doc.getElementById("idnom").value = p.nom;
        $("#idnom", doc).val(p.nom);

        //doc.getElementById("idrace").value = p.race;
        $("#idrace", doc).val(p.race);

        //doc.getElementById("idctaille").selectedIndex = parseInt(p.ctaille);
        $("#idctaille", doc).prop("selectedIndex", parseInt(p.ctaille));

        //doc.getElementById("idsexe").value = p.sexe;
        $("#idsexe", doc).val(p.sexe);

        //doc.getElementById("idjoueur").value = p.joueur;
        $("#idjoueur", doc).val(p.joueur);

        //doc.getElementById("idmd").value = p.md;
        $("#idmd", doc).val(p.md);

        //doc.getElementById("idpartie").value = p.partie;
        $("#idpartie", doc).val(p.partie);

        //doc.getElementById("idclasses").value = p.classes;
        $("#idclasses", doc).val(p.classes);

        //doc.getElementById("idcdp").value = p.cdp;
        $("#idcdp", doc).val(p.cdp);

        //doc.getElementById("idreligion").value = p.religion;
        $("#idreligion", doc).val(p.religion);

        //doc.getElementById("idorigine").value = p.origine;
        $("#idorigine", doc).val(p.origine);

        //doc.getElementById("idalign").value = p.align;
        $("#idalign", doc).val(p.align);

        //doc.getElementById("idage").value = p.age;
        $("#idage", doc).val(p.age);

        //doc.getElementById("iddextrie").value = p.dextrie;
        $("#iddextrie", doc).val(p.dextrie);

        //doc.getElementById("idpoids").value = p.poids;
        $("#idpoids", doc).val(p.poids);

        //doc.getElementById("idtaille").value = p.taille;
        $("#idtaille", doc).val(p.taille);

        //doc.getElementById("idyeux").value = p.yeux;
        $("#idyeux", doc).val(p.yeux);

        //doc.getElementById("idcheveux").value = p.cheveux;
        $("#idcheveux", doc).val(p.cheveux);

        //doc.getElementById("idpeau").value = p.peau;
        $("#idpeau", doc).val(p.peau);

        //doc.getElementById("idnoteidentité").value = p.noteidentité;
        $("#idnoteidentité", doc).val(p.noteidentité);

        fiche.setstats(doc);
        for (var i = 0; i < 6; i++) {
            // on recopie l'index dans une closure pour le préserver, sinon les fonctions dans les évènements recevront toujours la valeur '6'
            (function (contextIndex) {
                //doc.getElementById("bb-plus-" + i).onclick = function () {  }; new Function("p." + arrayget(stbtab, i) + "++; fiche.setstats();");
                $("#bb-plus-" + contextIndex, doc).on("click", function () { p[fiche.stbtab[contextIndex]]++; fiche.setstats(doc); });
                $("#bb-moins-" + contextIndex, doc).on("click", function () { p[fiche.stbtab[contextIndex]]--; fiche.setstats(doc); });
                $("#b-plus-" + contextIndex, doc).on("click", function () { p[fiche.sttab[contextIndex]]++; fiche.setstats(doc); });
                $("#b-moins-" + contextIndex, doc).on("click", function () { p[fiche.sttab[contextIndex]]--; fiche.setstats(doc); });
                $("#b-egal-" + contextIndex, doc).on("click", function () { p[fiche.sttab[contextIndex]] = p[fiche.stbtab[contextIndex]]; fiche.setstats(doc); });
            })(i);
        }
    },

    setstats: function () {
        var doc = fiche.popup.doc;

        //doc.getElementById("idbase0").innerHTML = statecho(p.foxbase);
        $("#idbase0", doc).html(statecho(p.forbase));
        $("#idbase1", doc).html(statecho(p.dexbase));
        $("#idbase2", doc).html(statecho(p.conbase));
        $("#idbase3", doc).html(statecho(p.intbase));
        $("#idbase4", doc).html(statecho(p.sagbase));
        $("#idbase5", doc).html(statecho(p.chabase));
        //doc.getElementById("id0").innerHTML = statecho(p.force);
        $("#id0", doc).html(statecho(p.force));
        $("#id1", doc).html(statecho(p.dex));
        $("#id2", doc).html(statecho(p.con));
        $("#id3", doc).html(statecho(p.int));
        $("#id4", doc).html(statecho(p.sag));
        $("#id5", doc).html(statecho(p.cha));
    },

    bCombat: function () {
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        fiche.sauve();
        vide(main);
        fiche.affiche = 2;
        main.style.border = "1px solid #3b3124";
        var contenu = "<table width='100%'><tr><td>";
        contenu += "<table width='100%'><tr>";
        contenu += "<td width='33%'>";
        contenu += "<i style='font-size: 85%'>Exploration</i><br/>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>Init" + bwiki("Pathfinder-RPG.Déroulement dun combat.ashx#INITIATIVE") + "</td>";
        contenu += "<td style='font-weight:bold' align='center' id='idinit'>+0</td>";
        contenu += "<td>=</td>";
        contenu += "<td style='color:gray; font-size: 80%' id='idinitmod'></td>";
        contenu += "<td align='center' id='idinitdiv'>+0</td>";
        contenu += butpm("init+", "init-");
        contenu += "<td><input type='text' size='8' id='idinitnote'/></td>";
        contenu += "</tr>";
        contenu += "<tr><td>VD" + bwiki("Pathfinder-RPG.Valeurs de combat.ashx#VITESSEDEDEPLACEMENT") + "</td><td colspan='6'><input type='text' id='idvd' size='28'/></td></tr>";
        contenu += "<tr><td>Vision" + bwiki("Pathfinder-RPG.Exploration.ashx#VISIONLUMIERE") + "</td><td colspan='6'><input type='text' id='idvision' size='28'/></td></tr>";
        contenu += "<tr><td colspan='8'><textarea rows='6'" + fiche.tastyle + "id = 'idnotesexplo'></textarea></td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='33%'>";
        contenu += "<i style='font-size: 85%'>Jets de sauvegarde</i>" + bwiki("Pathfinder-RPG.Valeurs de combat.ashx#JETDESAUVEGARDE") + "<br/>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>Réf</td>";
        contenu += "<td style='font-weight:bold' align='center' id='idreftot'>+0</td><td>=</td>";
        contenu += "<td align='center' id='idrefbase'>0</td>";
        contenu += butpm("refbase+", "refbase-");
        contenu += "<td style='color:gray; font-size: 80%' id='idrefmod'></td>";
        contenu += "<td align='center' id='idrefdiv'>+0</td>";
        contenu += butpm("refdiv+", "refdiv-");
        contenu += "<td><input type='text' size='8' id='idrefnote'/></td>";
        contenu += "</tr>";
        contenu += "<tr><td>Vig</td>";
        contenu += "<td style='font-weight:bold' align='center' id='idvigtot'>+0</td><td>=</td>";
        contenu += "<td align='center' id='idvigbase'>0</td>";
        contenu += butpm("vigbase+", "vigbase-");
        contenu += "<td style='color:gray; font-size: 80%' id='idvigmod'></td>";
        contenu += "<td align='center' id='idvigdiv'>+0</td>";
        contenu += butpm("vigdiv+", "vigdiv-");
        contenu += "<td><input type='text' size='8' id='idvignote'/></td>";
        contenu += "</tr>";
        contenu += "<tr><td>Vol</td>";
        contenu += "<td style='font-weight:bold' align='center' id='idvoltot'>+0</td><td>=</td>";
        contenu += "<td align='center' id='idvolbase'>0</td>";
        contenu += butpm("volbase+", "volbase-");
        contenu += "<td style='color:gray; font-size: 80%' id='idvolmod'></td>";
        contenu += "<td align='center' id='idvoldiv'>+0</td>";
        contenu += butpm("voldiv+", "voldiv-");
        contenu += "<td><input type='text' size='8' id='idvolnote'/></td>";
        contenu += "</tr>";
        contenu += "<tr><td colspan='9'><textarea rows='6'" + fiche.tastyle + "id = 'idnotesjds'></textarea></td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='32%'>";
        contenu += "<i style='font-size: 85%'>Points de vie</i><br/>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>pv</td><td colspan='5'><input type='text' id='idpv' size='25'/></td></tr>";
        contenu += "<tr><td>pv max</td><td colspan='5'><input type='text' id='idpvmax' size='25'/></td></tr>";
        contenu += "<tr><td>Non létal</td><td colspan='5'><input type='text' id='iddgnl' size='25'/></td></tr>";
        contenu += "<tr><td colspan='8'><textarea rows='6'" + fiche.tastyle + "id = 'idnotespv'></textarea></td></tr>";
        contenu += "</table>";
        contenu += "</td></tr>";
        contenu += "<tr><td>";
        contenu += "<i style='font-size: 85%'>Valeurs de combat</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>BBA" + bwiki("Pathfinder-RPG.Valeurs de combat.ashx#BONUSDATTAQUE") + "</td>";
        contenu += "<td><table><tr>"
        contenu += butpm("bba+", "bba-");
        contenu += "<td id='idbba' align='center'></td></tr></table>";
        contenu += "</td></tr>";
        contenu += "<tr><td colspan='2' id='idbbacomment' style='color: grey; font-size: 85%; font-style: italic'></td></tr>";
        contenu += "<tr><td>BMO" + bwiki("Pathfinder-RPG.Manuvres offensives.ashx") + "</td><td><input type='text' id='idbmo' size='25'/></td></tr>";
        contenu += "<tr><td>CA" + bwiki("Pathfinder-RPG.Valeurs de combat.ashx#CA") + "</td><td><input type='text' id='idca' size='25'/></td></tr>";
        contenu += "<tr><td>CA contact</td><td><input type='text' id='idcacontact' size='25'/></td></tr>";
        contenu += "<tr><td>CA surpris</td><td><input type='text' id='idcasurpris' size='25'/></td></tr>";
        contenu += "<tr><td>DMD" + bwiki("Pathfinder-RPG.Manuvres offensives.ashx") + "</td><td><input type='text' id='iddmd' size='25'/></td></tr>";
        contenu += "<tr><td colspan='2'><textarea rows='6'" + fiche.tastyle + "id = 'idnotescombat'></textarea></td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td></td>";
        contenu += "<td colspan='3'>";
        contenu += "<i style='font-size: 85%'>Armes et modes d'attaque</i>" + bwiki("Pathfinder-RPG.Tableau%20r%c3%a9capitulatif%20des%20armes.ashx");
        contenu += "<textarea rows='19'" + fiche.tastyle + "id = 'idarmes'></textarea>";
        contenu += "</td></tr>";
        contenu += "<tr><td colspan='5'><textarea rows='6'" + fiche.tastyle + "id = 'idnotescombat2'></textarea></td></tr>";
        contenu += "</table>";
        contenu += "</td></tr></table>";
        main.innerHTML = contenu;
        fiche.bwikiset();
        doc.getElementById("idinitnote").value = p.initnote;
        doc.getElementById("idvd").value = p.vd;
        doc.getElementById("idvision").value = p.vision;
        doc.getElementById("idnotesexplo").value = p.notesexplo;
        doc.getElementById("init+").onclick = new Function("p.initdiv = modif(p.initdiv,1); fiche.majCombat();");
        doc.getElementById("init-").onclick = new Function("p.initdiv = modif(p.initdiv,-1); fiche.majCombat();");
        doc.getElementById("idrefnote").value = p.refnote;
        doc.getElementById("idvignote").value = p.vignote;
        doc.getElementById("idvolnote").value = p.volnote;
        doc.getElementById("idnotesjds").value = p.notesjds;
        doc.getElementById("refbase+").onclick = new Function("p.refbase = modif(p.refbase,1); fiche.majCombat();");
        doc.getElementById("refbase-").onclick = new Function("p.refbase = modif(p.refbase,-1); fiche.majCombat();");
        doc.getElementById("refdiv+").onclick = new Function("p.refdiv = modif(p.refdiv,1); fiche.majCombat();");
        doc.getElementById("refdiv-").onclick = new Function("p.refdiv = modif(p.refdiv,-1); fiche.majCombat();");
        doc.getElementById("vigbase+").onclick = new Function("p.vigbase = modif(p.vigbase,1); fiche.majCombat();");
        doc.getElementById("vigbase-").onclick = new Function("p.vigbase = modif(p.vigbase,-1); fiche.majCombat();");
        doc.getElementById("vigdiv+").onclick = new Function("p.vigdiv = modif(p.vigdiv,1); fiche.majCombat();");
        doc.getElementById("vigdiv-").onclick = new Function("p.vigdiv = modif(p.vigdiv,-1); fiche.majCombat();");
        doc.getElementById("volbase+").onclick = new Function("p.volbase = modif(p.volbase,1); fiche.majCombat();");
        doc.getElementById("volbase-").onclick = new Function("p.volbase = modif(p.volbase,-1); fiche.majCombat();");
        doc.getElementById("voldiv+").onclick = new Function("p.voldiv = modif(p.voldiv,1); fiche.majCombat();");
        doc.getElementById("voldiv-").onclick = new Function("p.voldiv = modif(p.voldiv,-1); fiche.majCombat();");
        doc.getElementById("idpv").value = p.pv;
        doc.getElementById("idpvmax").value = p.pvmax;
        doc.getElementById("iddgnl").value = p.dgnl;
        doc.getElementById("idnotespv").value = p.notespv;
        doc.getElementById("bba+").onclick = new Function("p.bba = modif(p.bba,1); fiche.majCombat();");
        doc.getElementById("bba-").onclick = new Function("p.bba = modif(p.bba,-1); fiche.majCombat();");
        doc.getElementById("idbmo").value = p.bmo;
        doc.getElementById("iddmd").value = p.dmd;
        doc.getElementById("idca").value = p.ca;
        doc.getElementById("idcasurpris").value = p.casurpris;
        doc.getElementById("idcacontact").value = p.cacontact;
        doc.getElementById("idnotescombat").value = p.notescombat;
        doc.getElementById("idnotescombat2").value = p.notescombat2;
        doc.getElementById("idarmes").value = p.armes;
        fiche.majCombat();
    },

    majCombat: function () {
        var doc = fiche.popup.doc;

        var val = 0;
        doc.getElementById("idinitmod").innerHTML = statmodecho(p.dex) + " Dex";
        doc.getElementById("idinitdiv").innerHTML = zaffiche(parseInt(p.initdiv));
        val = parseInt(p.initdiv) + statmod(p.dex);
        doc.getElementById("idinit").innerHTML = zaffiche(val);
        doc.getElementById("idrefbase").innerHTML = zaffiche(parseInt(p.refbase));
        doc.getElementById("idrefdiv").innerHTML = zaffiche(parseInt(p.refdiv));
        doc.getElementById("idrefmod").innerHTML = statmodecho(p.dex) + " Dex";
        val = parseInt(p.refbase) + parseInt(p.refdiv) + statmod(p.dex);
        doc.getElementById("idreftot").innerHTML = zaffiche(val);
        doc.getElementById("idvigbase").innerHTML = zaffiche(parseInt(p.vigbase));
        doc.getElementById("idvigdiv").innerHTML = zaffiche(parseInt(p.vigdiv));
        doc.getElementById("idvigmod").innerHTML = statmodecho(p.con) + " Con";
        val = parseInt(p.vigbase) + parseInt(p.vigdiv) + statmod(p.con);
        doc.getElementById("idvigtot").innerHTML = zaffiche(val);
        doc.getElementById("idvolbase").innerHTML = zaffiche(parseInt(p.volbase));
        doc.getElementById("idvoldiv").innerHTML = zaffiche(parseInt(p.voldiv));
        doc.getElementById("idvolmod").innerHTML = statmodecho(p.sag) + " Sag";
        val = parseInt(p.volbase) + parseInt(p.voldiv) + statmod(p.sag);
        doc.getElementById("idvoltot").innerHTML = zaffiche(val);
        var bba = parseInt(p.bba);
        var mfor = statmod(p.force);
        var mdex = statmod(p.dex);
        var ct = parseInt(p.ctaille);
        var modtai = 0;
        if (ct == 0) modtai = -8;
        if (ct == 1) modtai = -4;
        if (ct == 2) modtai = -2;
        if (ct == 3) modtai = -1;
        if (ct == 5) modtai = 1;
        if (ct == 6) modtai = 2;
        if (ct == 7) modtai = 4;
        if (ct == 8) modtai = 8;
        var tbba = "";
        var tcac = "";
        var tdist = "";
        while (bba > 5) {
            tbba += "/" + zaffiche(bba);
            tcac += "/" + zaffiche(bba + mfor + modtai);
            tdist += "/" + zaffiche(bba + mdex + modtai);
            bba -= 5;
        }
        tbba += "/" + zaffiche(bba);
        tcac += "/" + zaffiche(bba + mfor + modtai);
        tdist += "/" + zaffiche(bba + mdex + modtai);
        doc.getElementById("idbba").innerHTML = tbba.substring(1);
        doc.getElementById("idbbacomment").innerHTML = "Càc : " + tcac.substring(1) + " ; Dist : " + tdist.substring(1);
    },

    bCapac: function () {
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        fiche.sauve();
        vide(main);
        fiche.affiche = 3;
        main.style.border = "1px solid #3b3124";
        var contenu = "<table width='100%'><tr><td>";
        contenu += "<table width='100%'><tr style='vertical-align: top'>";
        contenu += "<td width='49%' rowspan='2'>";
        contenu += "<i style='font-size: 85%'>Traits et traits raciaux</i>";
        contenu += "<textarea rows='8'" + fiche.tastyle + "id = 'idtraits'></textarea>";
        contenu += "<i style='font-size: 85%'>Capacités de classe</i>";
        contenu += "<textarea rows='14'" + fiche.tastyle + "id = 'idcapacités'></textarea>";
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='50%'>";
        contenu += "<i style='font-size: 85%'>Compétences martiales</i>";
        contenu += "<textarea rows='8'" + fiche.tastyle + "id = 'idcpmartiales'></textarea>";
        contenu += "<i style='font-size: 85%'>Dons</i>" + bwiki("Pathfinder-RPG.tableau%20r%c3%a9capitulatif%20des%20dons.ashx");
        contenu += "<textarea rows='14'" + fiche.tastyle + "id = 'iddons'></textarea>";
        contenu += "</td>";
        contenu += "</tr></table>";
        contenu += "<table width='100%'>";
        contenu += "<tr>";
        contenu += "<td width='59%'><i style='font-size: 85%'>Langues</i></td>";
        contenu += "<td width='1%' rowspan='2'></td>";
        contenu += "<td width='40%'><i style='font-size: 85%'>Notes</i></td>";
        contenu += "</tr>";
        contenu += "<tr>";
        contenu += "<td style='border: 1px solid #4b3124'>";
        contenu += "<table width='100%'>";
        for (var i = 0; i < fiche.lgtab.length / 3; i++) {
            contenu += "<tr>";
            var nom = arrayget(fiche.lgtab, i);
            var titre = (nom.substring(0, 1) == "*");
            if (titre) nom = nom.substring(1);
            if (titre)
                contenu += "<td><b>" + nom + "</b></td>";
            else
                contenu += "<td><input type='checkbox' id='idlgbox" + i + "'/> " + nom + "</td>";
            nom = arrayget(fiche.lgtab, i + fiche.lgtab.length / 3);
            titre = (nom.substring(0, 1) == "*");
            if (titre) nom = nom.substring(1);
            if (titre)
                contenu += "<td><b>" + nom + "</b></td>";
            else
                contenu += "<td><input type='checkbox' id='idlgbox" + (i + fiche.lgtab.length / 3) + "'/> " + nom + "</td>";
            nom = arrayget(fiche.lgtab, i + 2 * fiche.lgtab.length / 3);
            titre = (nom.substring(0, 1) == "*");
            if (titre) nom = nom.substring(1);
            if (titre)
                contenu += "<td><b>" + nom + "</b></td>";
            else
                contenu += "<td><input type='checkbox' id='idlgbox" + (i + 2 * fiche.lgtab.length / 3) + "'/> " + nom + "</td>";
            if (i == 0) {
                contenu += "<td rowspan='" + fiche.lgtab.length / 3 + "'>";
                contenu += "<textarea rows='12'" + fiche.tastyle + "id = 'idlangues'></textarea></td>";
            }
            contenu += "</tr>";
        }
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td><textarea rows='13'" + fiche.tastyle + "id = 'idnotescapacités'></textarea></td>";
        contenu += "</tr></table>";
        contenu += "</td></tr></table>";
        main.innerHTML = contenu;
        fiche.bwikiset();
        doc.getElementById("idtraits").value = p.traits;
        doc.getElementById("idcpmartiales").value = p.cpmartiales;
        doc.getElementById("idcapacités").value = p.capacités;
        doc.getElementById("iddons").value = p.dons;
        doc.getElementById("idlangues").value = p.langues;
        doc.getElementById("idnotescapacités").value = p.notescapacités;
        for (var i = 0; i < fiche.lgtab.length; i++) {
            var box = doc.getElementById("idlgbox" + i);
            if (box) {
                if (arrayget(p.languesbool, i) == "1")
                    box.checked = "checked";
                box.onclick = new Function("if (arrayget(p.languesbool," + i + ")=='0') arrayset(p.languesbool," + i + ",'1'); else arrayset(p.languesbool," + i + ",'0');");
            }
        }
    },

    bComp: function () {
        //console.profile("bComp");
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        fiche.sauve();
        vide(main);
        fiche.affiche = 4;
        main.style.border = "1px solid #3b3124";
        var contenu = "<table width='100%'><tr><td>";
        contenu += "<table width='100%'><tr><td width='49%'>";
        contenu += "<table width='100%' cellspacing='0px'>";
        contenu += "<tr style='font-size: 85%'>";
        contenu += "<td align='center'>Cc</td><td><i>Compétence</i></td><td align='center'>Tot</td><td></td><td colspan='2' align='center'>Rgs</td><td align='center'>Mod</td>";
        contenu += "<td colspan='3'>Divers</td></tr>";

        for (var i = 0; i < fiche.ctab.length; i++) {
            if (i == fiche.ctab.length / 2) {
                contenu += "</table>";
                contenu += "<td width='1%' style='border-right: 1px solid #4b3124'>&ensp;</td>";
                contenu += "<td width='1%'>&ensp;</td>";
                contenu += "<td width='49%'>";
                contenu += "<table width='100%' cellspacing='0px'>";
                contenu += "<tr><td align='center'>Cc</td><td><i>Compétence</i></td><td align='center'>Tot</td><td></td><td colspan='2' align='center'>Rgs</td><td align='center'>Mod</td>";
                contenu += "<td colspan='3'>Divers</td></tr>";
            }
            var nom = fiche.ctab[i];
            var inne = (nom.substring(0, 1) == "I");
            if (inne)
                nom = nom.substring(2);
            else
                nom = nom.substring(1);
            var ajout = (nom.substring(0, 1) == "*");
            if (ajout)
                nom = nom.substring(1);

            // Le nom contient le nom réel, suivi d'un "!" et du nom de la page wiki à utiliser
            var pos = nom.indexOf("!");
            var url = "Pathfinder-RPG." + nom.substring(pos + 1) + ".ashx";
            nom = nom.substring(0, pos);

            contenu += "<tr>";
            // idcclabox = checkbox compétence de classe ?
            contenu += "<td align='center'><input type='checkbox' id='idcclabox" + i + "'/></td>";
            contenu += "<td style='font-size: 85%'>" + nom;
            if (ajout) {
                contenu += " (<input id='idcnom" + i + "' type='text' size='8' value='" + p.cnom[i] + "'/>)";
            }
            contenu += bwiki(url) + "</td>";
            contenu += "<td style='font-weight:bold' align='center' id='idctot" + i + "'>+0</td><td>=</td>";
            contenu += "<td align='center' id='idcrangs" + i + "'>0</td>";
            contenu += butpm("bcrangs-plus-" + i, "bcrangs-moins-" + i);
            contenu += "<td style='color:gray; font-size: 80%' id='idcmod" + i + "'></td>";
            contenu += "<td align='center' id='idcdivers" + i + "'>+0</td>";
            contenu += butpm("bcdiv-plus-" + i, "bcdiv-moins-" + i);
            contenu += "<td><input type='text' size='8' id='idcnote" + i + "'/></td>";
            contenu += "</tr>";
        }
        contenu += "</table>";
        contenu += "</td></tr></table>";
        contenu += "</td></tr>";
        contenu += "<tr><td>";
        contenu += "<table width='100%'><tr>";
        contenu += "<td width='76%'>";
        contenu += "<i style='font-size: 85%'>Notes</i> <div id='rtot' style='float:right'>(nombre de rangs utilisés : 0)</div>";
        contenu += "<textarea rows='3'" + fiche.tastyle + "id = 'idnotescompétences'></textarea>";
        contenu += "</td>";
        contenu += "<td width='24%'><center>";
        contenu += "Ajouter des cpt de classe" + bwiki("Pathfinder-RPG.Tableau récapitulatif des compétences.ashx") + "<br/>";
        contenu += "<select id='choixclasse' size='1'>";
        for (var k = 0; k < fiche.classestab.length; k++)
            contenu += "<option>" + fiche.classestab[k] + "</option>";
        contenu += "</select>&emsp;";
        contenu += "<button type='button' id='bajoutcc'>Ajouter</button><br/><br/>";
        contenu += "<small><i>(*) moins la pénalité d'armure</i></small>";
        contenu += "</center></td>";
        contenu += "</tr></table>";
        contenu += "</td></tr></table>";

        main.innerHTML = contenu;
        fiche.bwikiset();

        doc.getElementById("idnotescompétences").value = p.notescompétences;

        for (var i = 0; i < fiche.ctab.length; i++) {
            (function (contextIndex) {

                // on affecte la note de chaque compétence
                //doc.getElementById("idcnote" + i).value = p.cnote[i];
                $("#idcnote" + contextIndex, doc).val(p.cnote[contextIndex]);

                //doc.getElementById("bcrangs+" + i).onclick = new Function("arrayset(p.crangs," + i + ",modif(arrayget(p.crangs," + i + "),1)); fiche.majCpt();");
                $("#bcrangs-plus-" + contextIndex, doc).on("click", function () {
                    p.crangs[contextIndex] = (parseInt(p.crangs[contextIndex]) || 0) + 1;
                    fiche.majCpt();
                });

                //doc.getElementById("bcrangs-" + i).onclick = new Function("arrayset(p.crangs," + i + ",modif(arrayget(p.crangs," + i + "),-1)); fiche.majCpt();");
                $("#bcrangs-moins-" + contextIndex, doc).on("click", function () {
                    p.crangs[contextIndex] = (parseInt(p.crangs[contextIndex]) || 0) - 1;
                    fiche.majCpt();
                });

                //doc.getElementById("bcdiv+" + i).onclick = new Function("arrayset(p.cdivers," + i + ",modif(arrayget(p.cdivers," + i + "),1)); fiche.majCpt();");
                $("#bcdiv-plus-" + contextIndex, doc).on("click", function () {
                    p.cdivers[contextIndex] = (parseInt(p.cdivers[contextIndex]) || 0) + 1;
                    fiche.majCpt();
                });

                //doc.getElementById("bcdiv-" + i).onclick = new Function("arrayset(p.cdivers," + i + ",modif(arrayget(p.cdivers," + i + "),-1)); fiche.majCpt();");
                $("#bcdiv-moins-" + contextIndex, doc).on("click", function () {
                    p.cdivers[contextIndex] = (parseInt(p.cdivers[contextIndex]) || 0) - 1;
                    fiche.majCpt();
                });

                //doc.getElementById("idcclabox" + i).onclick = new Function("if (arrayget(p.cclasse," + i + ")=='0') arrayset(p.cclasse," + i + ",'1'); else arrayset(p.cclasse," + i + ",'0'); fiche.majCpt();");
                $("#idcclabox" + contextIndex, doc).on("click", function () {
                    if (p.cclasse[contextIndex] === "1" || p.cclasse[contextIndex] === 1 || p.cclasse[i] === true) {
                        p.cclasse[contextIndex] = 0;
                    }
                    else {
                        p.cclasse[contextIndex] = 1;
                    }
                    fiche.majCpt();
                });
            })(i);
        }

        doc.getElementById("bajoutcc").onclick = fiche.ajoutcc;
        fiche.majCpt();
        //console.profileEnd();
    },

    ajoutcc: function () {
        var doc = fiche.popup.doc;
        var classe = $("#choixclasse", doc).val();
        console.log(classe);
        var aj = fiche.compclasse[classe];
        console.log(aj);
        if (fiche.popup.window.confirm("Voulez-vous ajouter comme compétences de classe toutes les compétences du " + classe + " ?"))
            for (var i = 0; i < aj.length; i++)
                arrayset(p.cclasse, arrayget(aj, i), "1");
        fiche.majCpt();
    },

    majCpt: function () {
        var doc = fiche.popup.doc;
        var totr = 0;
        for (var i = 0; i < fiche.ctab.length; i++) {
            var nom = arrayget(fiche.ctab, i);
            var inne = (nom.substring(0, 1) == "I");
            if (inne) nom = nom.substring(1);
            var stat = parseInt(nom.substring(0, 1));
            var tot = 0;
            doc.getElementById("idcrangs" + i).innerHTML = arrayget(p.crangs, i);
            tot += parseInt(arrayget(p.crangs, i));
            var entraine = (tot > 0);
            totr += tot;
            var contenu = "";
            switch (stat) {
                case 1:
                    contenu += statmodecho(p.force) + " For";
                    tot += statmod(p.force);
                    break;
                case 2:
                    contenu += statmodecho(p.dex) + " Dex";
                    tot += statmod(p.dex);
                    break;
                case 3:
                    contenu += statmodecho(p.con) + " Con";
                    tot += statmod(p.con);
                    break;
                case 4:
                    contenu += statmodecho(p.int) + " Int";
                    tot += statmod(p.int);
                    break;
                case 5:
                    contenu += statmodecho(p.sag) + " Sag";
                    tot += statmod(p.sag);
                    break;
                case 6:
                    contenu += statmodecho(p.cha) + " Cha";
                    tot += statmod(p.cha);
                    break;
                default:
                    contenu += "???";
                    break;
            }
            if ((arrayget(p.cclasse, i) == "1") && entraine) {
                contenu += " +3";
                tot += 3;
            }
            if (arrayget(p.cclasse, i) == "1")
                doc.getElementById("idcclabox" + i).checked = "checked";
            doc.getElementById("idcmod" + i).innerHTML = contenu;
            doc.getElementById("idcdivers" + i).innerHTML = zaffiche(parseInt(arrayget(p.cdivers, i)));
            tot += parseInt(arrayget(p.cdivers, i));
            var util = inne || entraine;
            doc.getElementById("idctot" + i).innerHTML = (util ? "" : "(") + zaffiche(tot) + (util ? "" : ")") + ((stat == 1) || (stat == 2) ? "*" : "");
        }

        doc.getElementById("rtot").innerHTML = "(nombre de rangs utilisés : " + totr + ")";
    },

    bMagie: function () {
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        if (!p.surl) {
            p.surl = new Array(500);
            for (var i = 0; i < 500; i++)
                arrayset(p.surl, i, "");
        }
        fiche.sauve();
        vide(main);
        fiche.affiche = 5;
        main.style.border = "1px solid #3b3124";
        var contenu = "<table width='100%'><tr><td>";
        contenu += "<table width='100%'><tr>";
        contenu += "<td width='35%'>";
        contenu += "<i style='font-size: 85%'>Sorts par niveau" + bwiki("Pathfinder-RPG.Caract%C3%A9ristiques.ashx#DETERMINERLESMODIFICATEURS") + "</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td align='center'>Niv</td><td align='center'>DD</td><td align='center'>par jour</td>";
        contenu += "<td align='center'>P</td><td align='center'>L</td><td align='center'>connus</td></tr>";
        for (var i = 0; i < 10 ; i++) {
            contenu += "<tr><td align='center'><b>" + i + "</b></td>";
            contenu += "<td align='center'><input type='text' id='dd" + i + "' size='4'/></td>";
            contenu += "<td align='center'><input type='text' id='sortsparjour" + i + "' size='10'/></td>";
            contenu += "<td align='center' style='color: grey' id='idp" + i + "'></td>";
            contenu += "<td align='center' style='color: grey' id='idl" + i + "'></td>";
            contenu += "<td align='center'><input type='text' id='sortsconnus" + i + "' size='10'/></td></tr>";
        }
        contenu += "<tr><td colspan='2' style='padding-top: 8px'>Concentration" + bwiki("Pathfinder-RPG.Lancer des sorts.ashx#CONCENTRATION") + "</td>";
        contenu += "<td  style='padding-top: 8px' colspan='4'><input type='text' id='conc' size='20'/></td></tr>";
        contenu += "<tr><td colspan='6'><textarea rows='5'" + fiche.tastyle + "id = 'idnotessorts'></textarea></td></tr>";
        contenu += "</table>";
        contenu += "<i style='font-size: 85%'>Domaines" + bwiki("Pathfinder-RPG.Domaines.ashx") + ", écoles" + bwiki("Pathfinder-RPG.écoles de magie.ashx") + ", lignages" + bwiki("Pathfinder-RPG.Lignages.ashx") + "</i>";
        contenu += "<textarea rows='11'" + fiche.tastyle + "id = 'iddomaines'></textarea>";
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='64%'>"
        contenu += "<center style='padding-bottom: 3px'>"
        for (var i = 0; i < 10; i++)
            contenu += "<button type='button' style='font-size: 75%' id='buts" + i + "'>" + i + "</button>&ensp;";
        contenu += "<button type='button' style='font-size: 75%' id='buts*'>*</button>&ensp;"
        contenu += "<button type='button' style='font-size: 75%' id='butsN'>Notes</button>"
        contenu += "</center>";
        contenu += "<div style='width: 100%; height: 625px; overflow: auto' id='sdiv'></div>";
        contenu += "</td>";
        contenu += "</tr></table>";
        contenu += "</td></tr></table>";
        main.innerHTML = contenu;
        fiche.bwikiset();
        for (var i = 0; i < 10; i++) {
            doc.getElementById("dd" + i).value = arrayget(p.dd, i);
            doc.getElementById("sortsparjour" + i).value = arrayget(p.sortsparjour, i);
            doc.getElementById("sortsconnus" + i).value = arrayget(p.sortsconnus, i);
        }
        doc.getElementById("conc").value = p.conc;
        doc.getElementById("idnotessorts").value = p.notessorts;
        doc.getElementById("iddomaines").value = p.domaines;
        for (var i = 0; i < 10; i++)
            doc.getElementById("buts" + i).onclick = new Function("fiche.sbut(" + i + ");");
        doc.getElementById("buts*").onclick = new Function("fiche.sbut(10);");
        doc.getElementById("butsN").onclick = new Function("fiche.sbut(11);");
        fiche.saffiche = -1;
        fiche.snums = new Array(0);
        fiche.sbut(11);
        fiche.majSorts(-1);
    },

    ssauve: function () {
        var doc = fiche.popup.doc;

        var saffiche = fiche.saffiche;
        if (saffiche == 11)
            p.sorts = doc.getElementById("idsorts").value;
        if (saffiche == 10) {
            for (var i = 0; i < snums.length; i++) {
                var j = arrayget(snums, i);
                arrayset(p.snom, j, doc.getElementById("idsnom" + j).value);
                arrayset(p.snote, j, doc.getElementById("idsnote" + j).value);
            }
        }
        if ((saffiche < 10) && (saffiche >= 0)) {
            for (var i = 0; i < 50; i++) {
                var j = 50 * saffiche + i;
                arrayset(p.snom, j, doc.getElementById("idsnom" + i).value);
                arrayset(p.snote, j, doc.getElementById("idsnote" + i).value);
            }
            arrayset(p.notessortsniv, saffiche, doc.getElementById("idnotessortsniv" + saffiche).value);
        }
    },

    sbut: function (niv, choix) {
        /// <summary>Met à jour l'éditeur de sorts pour permettre de sélectionner les sorts du niveau indiqué.</summary>
        var doc = fiche.popup.doc;

        sdiv = $("#sdiv", doc);
        fiche.ssauve();
        vide(sdiv);
        fiche.saffiche = niv;

        if (niv == 11) {
            sdiv.css("border", "0");
            sdiv.html("<textarea rows='40'" + fiche.tastyle + "id='idsorts'></textarea>");
            $("#idsorts", doc).val(p.sorts);
        }

        if (niv == 10) {
            // niveau * => liste globale
            sdiv.css("border", "1px solid #4b3124");
            var contenu = "<table width='100%'>";
            contenu += "<tr><td colspan='8' align='right'>";
            contenu += "<select id='choixcnd' size='1' style='font-size: 85%'>";
            contenu += "<option>Afficher les sorts qui ont un nom</option>";
            contenu += "<option>Afficher les sorts préparés qui ont un nom</option>";
            contenu += "<option>Afficher les sorts lançables qui ont un nom</option>";
            contenu += "</select>&emsp;";
            contenu += "<button type='button' id='go10'>Go</button></tr>";
            var slist = "";
            for (var i = 0; i < 10; i++) {
                contenu += "<tr><td colspan='8' style='padding: 1px; background-color: #4b3124'></td></tr>";
                contenu += "<tr><td colspan='2' align='center' style='font-size: 85%'>Prépa</td>";
                contenu += "<td colspan='2' align='center' style='font-size: 85%'>Lancé</td>";
                contenu += "<td style='font-size: 85%' colspan='2'>Sort (niveau " + i + ")</td>";
                contenu += "<td style='font-size: 85%'>Note</td><td></td></tr>";
                contenu += "<tr><td style='font-weight: bold' align='center' id='totp" + i + "'>0</td>";
                contenu += "<td align='center'><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/Bouton0.jpg' width='8px' id='razp" + i + "'/></td>";
                contenu += "<td style='font-weight: bold' align='center' id='totl" + i + "'>0</td>";
                contenu += "<td align='center'><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/Bouton0.jpg' width='8px' id='razl" + i + "'/></td>";
                contenu += "<td colspan='4'></td></tr>";
                for (var j = 50 * i; j < 50 * (i + 1) ; j++) {
                    var garde = (arrayget(p.snom, j) != "");
                    switch (choix) {
                        case 1:
                            garde = garde && (parseInt(arrayget(p.sprep, j)) > 0);
                            break;
                        case 2:
                            garde = garde && (parseInt(arrayget(p.sprep, j)) > parseInt(arrayget(p.slanc, j)));
                            break;
                    }
                    if (garde) {
                        slist += "," + j;
                        contenu += "<tr><td align='center' id='idsprep" + j + "'>0</td>";
                        contenu += butpm("bprep+" + j, "bprep-" + j);
                        contenu += "<td align='center' id='idslanc" + j + "'>0</td>";
                        contenu += butpm("blanc+" + j, "blanc-" + j);
                        contenu += "<td><input type='text' id='idsnom" + j + "' size='18'/></td>";
                        contenu += "<td id='idsbwiki" + j + "'></td>";
                        contenu += "<td><input type='text' id='idsnote" + j + "' size='32'/></td>";
                        contenu += "<td><button type='button' style='font-size: 75%' id='bchwiki" + j + "'>Lien</button></td></tr>";
                    }
                }
            }
            contenu += "</table>";
            sdiv.html(contenu);

            //doc.getElementById("choixcnd").selectedIndex = choix;
            if (choix) {
                $("#choixcnd", doc).prop("selectedIndex", choix);
            }
            
            //doc.getElementById("go10").onclick = new Function("fiche.sbut(10,$('#choixcnd').val());");
            $("#go10", doc).on("click", function () {
                var choixcnd = $('#choixcnd', doc).prop("selectedIndex");

                console.log(choixcnd);
                fiche.sbut(10, choixcnd);
            });
            
            for (var i = 0; i < 10; i++) {
                doc.getElementById("razp" + i).onclick = new Function("fiche.raz(0," + i + ",10);");
                doc.getElementById("razl" + i).onclick = new Function("fiche.raz(1," + i + ",10);");
            }
            if (slist.length > 0)
                snums = slist.substring(1).split(",");
            else
                snum = new Array(0);
            for (var i = 0; i < snums.length; i++) {
                var j = arrayget(snums, i);
                doc.getElementById("bprep+" + j).onclick = new Function("p.sprep[" + j + "] = modif(p.sprep[" + j + "],1); fiche.majSorts(10);");
                doc.getElementById("bprep-" + j).onclick = new Function("p.sprep[" + j + "] = modif(p.sprep[" + j + "],-1); fiche.majSorts(10);");
                doc.getElementById("blanc+" + j).onclick = new Function("p.slanc[" + j + "] = modif(p.slanc[" + j + "],1); fiche.majSorts(10);");
                doc.getElementById("blanc-" + j).onclick = new Function("p.slanc[" + j + "] = modif(p.slanc[" + j + "],-1); fiche.majSorts(10);");
                doc.getElementById("bchwiki" + j).onclick = new Function("fiche.chwiki(" + j + "); fiche.majSorts(10);");
                doc.getElementById("idsnom" + j).value = p.snom[j];
                doc.getElementById("idsnote" + j).value = p.snote[j];
                doc.getElementById("idsnom" + j).onchange = new Function("fiche.chname(" + j + ",doc.getElementById('idsnom" + j + "').value); fiche.majSorts(10);");
            }
            fiche.majSorts(10);
        }

        if ((niv >= 0) && (niv < 10)) {
            sdiv.css("border", "1px solid #4b3124");
            var contenu = "<table width='100%'>";
            contenu += "<tr><td colspan='8'><textarea rows='5'" + fiche.tastyle + "id='idnotessortsniv" + niv + "'></textarea></td></tr>";
            contenu += "<tr><td colspan='2' align='center' style='font-size: 85%'>Prépa</td>";
            contenu += "<td colspan='2' align='center' style='font-size: 85%'>Lancé</td>";
            contenu += "<td colspan='2' style='font-size: 85%'>Sort (niveau " + niv + ")</td>";
            contenu += "<td style='font-size: 85%'>Note</td>";
            contenu += "<td><button type='button' style='font-size: 75%' id='btri'>Tri</button></td></tr>";
            contenu += "<tr><td style='font-weight: bold' align='center' id='totp'>0</td>";
            contenu += "<td align='center'><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/Bouton0.jpg' width='8px' id='razp'/></td>";
            contenu += "<td style='font-weight: bold' align='center' id='totl'>0</td>";
            contenu += "<td align='center'><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/Bouton0.jpg' width='8px' id='razl'/></td>";
            contenu += "<td colspan='3'></td><td><button type='button' style='font-size: 75%' id='bvide'>Vide</button></td></tr>";
            for (var i = 0; i < 50; i++) {
                contenu += "<tr><td align='center' id='idsprep" + i + "'>0</td>";
                contenu += butpm("bprep+" + i, "bprep-" + i);
                contenu += "<td align='center' id='idslanc" + i + "'>0</td>";
                contenu += butpm("blanc+" + i, "blanc-" + i);
                contenu += "<td><input type='text' id='idsnom" + i + "' size='18'/></td>";
                contenu += "<td id='idsbwiki" + i + "'></td>";
                contenu += "<td><input type='text' id='idsnote" + i + "' size='32'/></td>";
                contenu += "<td><button type='button' style='font-size: 75%' id='bchwiki" + i + "'>Lien</button></td></tr>";
            }
            contenu += "</table>";
            sdiv.html(contenu);
            doc.getElementById("btri").onclick = new Function("fiche.stri(" + niv + ");");
            doc.getElementById("bvide").onclick = new Function("fiche.svide(" + niv + ");");
            doc.getElementById("idnotessortsniv" + niv).value = arrayget(p.notessortsniv, niv);
            doc.getElementById("razp").onclick = new Function("fiche.raz(0," + niv + "," + niv + ");");
            doc.getElementById("razl").onclick = new Function("fiche.raz(1," + niv + "," + niv + ");");
            for (var i = 0; i < 50; i++) {
                var j = 50 * niv + i;
                doc.getElementById("bprep+" + i).onclick = new Function("arrayset(p.sprep," + j + ",modif(arrayget(p.sprep," + j + "),1)); fiche.majSorts(" + niv + ");");
                doc.getElementById("bprep-" + i).onclick = new Function("arrayset(p.sprep," + j + ",modif(arrayget(p.sprep," + j + "),-1)); fiche.majSorts(" + niv + ");");
                doc.getElementById("blanc+" + i).onclick = new Function("arrayset(p.slanc," + j + ",modif(arrayget(p.slanc," + j + "),1)); fiche.majSorts(" + niv + ");");
                doc.getElementById("blanc-" + i).onclick = new Function("arrayset(p.slanc," + j + ",modif(arrayget(p.slanc," + j + "),-1)); fiche.majSorts(" + niv + ");");
                doc.getElementById("bchwiki" + i).onclick = new Function("fiche.chwiki(" + j + "); fiche.majSorts(" + niv + ");");
                doc.getElementById("idsnom" + i).value = arrayget(p.snom, j);
                doc.getElementById("idsnote" + i).value = arrayget(p.snote, j);
                doc.getElementById("idsnom" + i).onchange = new Function("fiche.chname(" + j + ",doc.getElementById('idsnom" + i + "').value); fiche.majSorts(" + niv + ");");
            }
            fiche.majSorts(niv);
        }
        fiche.bwikiset();
    },

    chname: function (j, nom) {
        if ((nom != "") && (arrayget(p.surl, j) == "")) {
            var sugg = nom.replace(/'/g, "").replace(//g, "").replace(/\u002F/g, "");
            sugg = "http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG." + sugg + ".ashx";
            arrayset(p.surl, j, sugg);
        }
    },

    chwiki: function (j) {
        var nom = arrayget(p.snom, j);
        var old = arrayget(p.surl, j);
        if (nom == "")
            nom = "sans nom";
        var quest = "Donnez la nouvelle adresse du lien pour le sort ";
        quest += (nom == "" ? "sans nom" : nom);
        quest += ", entrez une adresse vide pour ne mettre aucun lien ou cliquez sur Annuler pour ne rien changer.\n\n";
        if (old != "")
            quest += "Valeur actuelle : " + old + "\n\n";
        var sugg = nom.replace(/'/g, "").replace(//g, "").replace(/\u002F/g, "");
        if (sugg != "") {
            sugg = "http://www.pathfinder-fr.org/Wiki/Pathfinder-RPG." + sugg + ".ashx";
            quest += "Suggestion : " + sugg + "\n";
        }
        var rep = fiche.popup.window.prompt(quest, sugg);
        if (rep != null) arrayset(p.surl, j, rep);
    },

    svide: function (niv) {
        if (fiche.popup.window.confirm("Voulez-vous vraiment effacer toutes les informations relatives aux sorts de niveau " + niv + " ?")) {
            for (var i = 50 * niv; i < 50 * (niv + 1) - 1; i++) {
                arrayset(p.sprep, i, "0");
                arrayset(p.slanc, i, "0");
                arrayset(p.snom, i, "");
                arrayset(p.snote, i, "");
                arrayset(p.surl, i, "");
            }
        }
        fiche.saffiche = -1;
        fiche.sbut(niv);
    },

    stri: function (niv) {
        fiche.ssauve();
        for (var i = 50 * niv; i < 50 * (niv + 1) - 1; i++)
            for (var j = i + 1; j < 50 * (niv + 1) ; j++) {
                var swap = false;
                var videi = (arrayget(p.snom, i) == "");
                var videj = (arrayget(p.snom, j) == "");
                swap = (!videj) && (videi || (no_accent(arrayget(p.snom, i)) > no_accent(arrayget(p.snom, j))));
                if (swap) {
                    var tmp = arrayget(p.sprep, i);
                    arrayset(p.sprep, i, arrayget(p.sprep, j));
                    arrayset(p.sprep, j, tmp);
                    tmp = arrayget(p.slanc, i);
                    arrayset(p.slanc, i, arrayget(p.slanc, j));
                    arrayset(p.slanc, j, tmp);
                    tmp = arrayget(p.snom, i);
                    arrayset(p.snom, i, arrayget(p.snom, j));
                    arrayset(p.snom, j, tmp);
                    tmp = arrayget(p.snote, i);
                    arrayset(p.snote, i, arrayget(p.snote, j));
                    arrayset(p.snote, j, tmp);
                    tmp = arrayget(p.surl, i);
                    arrayset(p.surl, i, arrayget(p.surl, j));
                    arrayset(p.surl, j, tmp);
                }
            }
        fiche.saffiche = -1;
        fiche.sbut(niv);
    },

    raz: function (type, niv, nivmaj) {
        var quest = "Voulez-vous vraiment remettre à zéro tous les sorts ";
        if (type == 0)
            quest += "préparés ?";
        else
            quest += "lancés ?";
        if (fiche.popup.window.confirm(quest))
            if (type == 0)
                for (var i = 50 * niv; i < 50 * (niv + 1) ; i++)
                    arrayset(p.sprep, i, 0);
            else
                for (var i = 50 * niv; i < 50 * (niv + 1) ; i++)
                    arrayset(p.slanc, i, 0);
        majSorts(niv, nivmaj);
    },

    majSorts: function (niv) {
        var doc = fiche.popup.doc;

        if ((niv >= 0) && (niv < 10)) {
            var totp = 0;
            var totl = 0;
            for (var i = 0; i < 50; i++) {
                var j = 50 * niv + i;
                doc.getElementById("idsprep" + i).innerHTML = arrayget(p.sprep, j);
                doc.getElementById("idslanc" + i).innerHTML = arrayget(p.slanc, j);
                totp += parseInt(arrayget(p.sprep, j));
                totl += parseInt(arrayget(p.slanc, j));
                if (arrayget(p.surl, j) != "")
                    doc.getElementById("idsbwiki" + i).innerHTML = bwiki(arrayget(p.surl, j));
                else
                    doc.getElementById("idsbwiki" + i).innerHTML = "";
            }
            doc.getElementById("totp").innerHTML = totp;
            doc.getElementById("totl").innerHTML = totl;
            doc.getElementById("idp" + niv).innerHTML = totp;
            doc.getElementById("idl" + niv).innerHTML = totl;
        }
        if (niv == 10) {
            for (var i = 0; i < snums.length; i++) {
                var j = arrayget(snums, i);
                doc.getElementById("idsprep" + j).innerHTML = arrayget(p.sprep, j);
                doc.getElementById("idslanc" + j).innerHTML = arrayget(p.slanc, j);
                if (arrayget(p.surl, j) != "")
                    doc.getElementById("idsbwiki" + j).innerHTML = bwiki(arrayget(p.surl, j));
                else
                    doc.getElementById("idsbwiki" + j).innerHTML = "";
            }
        }
        if ((niv == -1) || (niv == 10)) {
            for (var i = 0; i < 10; i++) {
                var totp = 0;
                var totl = 0;
                for (var j = 50 * i; j < 50 * (i + 1) ; j++) {
                    totp += parseInt(arrayget(p.sprep, j));
                    totl += parseInt(arrayget(p.slanc, j));
                }
                doc.getElementById("idp" + i).innerHTML = totp;
                doc.getElementById("idl" + i).innerHTML = totl;
                if (niv == 10) {
                    doc.getElementById("totp" + i).innerHTML = totp;
                    doc.getElementById("totl" + i).innerHTML = totl;
                }
            }
        }

        fiche.bwikiset();
    },

    bEquip: function () {
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        fiche.sauve();
        vide(main);
        fiche.affiche = 6;
        main.style.border = "1px solid #3b3124";
        var contenu = "<table width='100%'><tr><td>";
        contenu += "<table width='100%'>";
        contenu += "<tr style='vertical-align: top'>";
        contenu += "<td width='49%'>";
        contenu += "<i style='font-size: 85%'>Équipement</i>" + bwiki("Pathfinder-RPG.Tableau récapitulatif des armures.ashx");
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        for (var i = 0; i < fiche.ptab.length ; i++) {
            var nom = arrayget(fiche.ptab, i);
            var titre = (nom.substring(0, 1) == "*");
            if (titre) {
                contenu += "<tr><td colspan='2' align='center' style='font-size: 80%'><b>~ " + nom.substring(1) + " ~</b></td>";
                if (i == 0)
                    contenu += "<td align='center'>Poids</td>";
                contenu += "</tr>";
            }
            else {
                contenu += "<tr><td>" + nom + "</td>";
                contenu += "<td><input type='text' id='idparure" + i + "' size='40'/></td>";
                contenu += "<td><input type='text' id='idpoidsparure" + i + "' size='4'/></td></tr>";
                if (nom == "Armure") {
                    contenu += "<tr><td></td><td colspan='2'><table width='100%'><tr>";
                    contenu += "<td>MaxDex <input type='text' id='idmaxdexarmure' size='3'/></td>";
                    contenu += "<td>Pénal <input type='text' id='idpénalitéarmure' size='3'/></td>";
                    contenu += "<td>Éch sorts <input type='text' id='idéchecsortsarmure' size='3'/></td>";
                    contenu += "</tr></table></td></tr>";
                }
                if (nom == "Bouclier") {
                    contenu += "<tr><td></td><td colspan='2'><table width='100%'><tr>";
                    contenu += "<td>MaxDex <input type='text' id='idmaxdexbouclier' size='3'/></td>";
                    contenu += "<td>Pénal <input type='text' id='idpénalitébouclier' size='3'/></td>";
                    contenu += "<td>Éch sorts <input type='text' id='idéchecsortsbouclier' size='3'/></td>";
                    contenu += "</tr></table></td></tr>";
                }
            }
        }
        contenu += "</table>";
        contenu += "<i style='font-size: 85%'>Richesses</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td width='85%'><textarea rows='3'" + fiche.tastyle + "id = 'idrichesses'></textarea></td>";
        contenu += "<td width='15%'><center>Poids<br/><input type='text' id='idpoidsrichesses' size='3'/><br/>";
        contenu += "<span style='font-size: 85%'><i>1 pièce<br/>= 0.01kg</i></span></center></td></tr>";
        contenu += "</table>"
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='50%'>";
        contenu += "<i style='font-size: 85%'>Possessions</i>" + bwiki("Pathfinder-RPG.Matériel daventurier.ashx");
        contenu += "<span style='font-size: 85%'>";
        /*        
        for (var i = 0; i < 6; i++)
            contenu += "&ensp;<button type='button' style='font-size: 80%' id='ebut" + i + "'>" + (i + 1) + "</button>";
        */
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='ebut0'>1</button>";
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='ebut1'>2</button>";
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='ebut2'>3</button>";
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='ebut3'>4</button>";
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='ebut4'>5</button>";
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='ebut5'>6</button>";
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='etri'>Tri</button>";
        contenu += "&ensp;<button type='button' style='font-size: 80%' id='evide'>Vide</button>";
        contenu += "</span>";
        contenu += "<div style='width: 100%; height: 410px; border: 1px solid #4b3124; overflow: auto' id='ediv'>";
        contenu += "</div>";
        contenu += "<i style='font-size: 85%'>Total</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>Poids total" + bwiki("Pathfinder-RPG.État civil et mensurations.ashx#POIDSTRANSPORTABLE") + "</td><td id='poidstotal'>0 kg</td></tr>";
        contenu += "<tr><td colspan='2' id='charge' style='color: gray; font-size: 80%'>???</td></tr>";
        contenu += "<tr><td colspan='2' id='chval' style='color: gray; font-size: 80%'></td></tr>";
        contenu += "</table>";
        contenu += "<i style='font-size: 85%'>Notes</i>";
        contenu += "<textarea rows='7'" + fiche.tastyle + "id = 'idnoteséquipement'></textarea>";
        contenu += "</td>";
        contenu += "</tr></table>";
        contenu += "</td></tr></table>";
        $(main).html(contenu);

        fiche.bwikiset();
        //doc.getElementById("ebut" + i).onclick = new Function("ebut(" + i + "); majEquip();");
        $("#ebut0", $(main)).on("click", function () { fiche.ebut(0); });
        $("#ebut1", $(main)).on("click", function () { fiche.ebut(1); });
        $("#ebut2", $(main)).on("click", function () { fiche.ebut(2); });
        $("#ebut3", $(main)).on("click", function () { fiche.ebut(3); });
        $("#ebut4", $(main)).on("click", function () { fiche.ebut(4); });
        $("#ebut5", $(main)).on("click", function () { fiche.ebut(5); });

        doc.getElementById("etri").onclick = new Function("fiche.etri();");
        doc.getElementById("evide").onclick = new Function("fiche.evide();");
        for (var i = 0; i < fiche.ptab.length ; i++) {
            (function (contextIndex) {
                var titre = fiche.ptab[contextIndex].substring(0, 1) == "*";
                if (!titre) {
                    //doc.getElementById("idparure" + i).value = arrayget(p.parure, i);
                    $("#idparure" + contextIndex, doc).val(p.parure[contextIndex]);

                    //doc.getElementById("idpoidsparure" + i).value = arrayget(p.poidsparure, i);
                    //doc.getElementById("idpoidsparure" + i).onchange = function () { fiche.sauve(); fiche.majEquip(); }
                    $("#idpoidsparure" + contextIndex, doc)
                        .val(p.poidsparure[contextIndex])
                        .on("change", function () {
                            fiche.sauve();
                            fiche.majEquip();
                        });
                }
            })(i);
        }
        doc.getElementById("idmaxdexarmure").value = p.maxdexarmure;
        doc.getElementById("idpénalitéarmure").value = p.pénalitéarmure;
        doc.getElementById("idéchecsortsarmure").value = p.échecsortsarmure;
        doc.getElementById("idmaxdexbouclier").value = p.maxdexbouclier;
        doc.getElementById("idpénalitébouclier").value = p.pénalitébouclier;
        doc.getElementById("idéchecsortsbouclier").value = p.échecsortsbouclier;
        doc.getElementById("idrichesses").value = p.richesses;
        doc.getElementById("idpoidsrichesses").value = p.poidsrichesses;
        doc.getElementById("idpoidsrichesses").onchange = new Function("fiche.sauve(); fiche.majEquip();");
        doc.getElementById("idnoteséquipement").value = p.noteséquipement;
        fiche.eaffiche = -1;
        fiche.ebut(0);
    },

    esauve: function () {
        var doc = fiche.popup.doc;

        if (fiche.eaffiche != -1) {
            arrayset(p.sacoches, fiche.eaffiche, doc.getElementById("sacnom").value);
            arrayset(p.sacochescompte, fiche.eaffiche, (doc.getElementById('sacpoids').checked ? "1" : "0"));
            for (var i = 0; i < 25 ; i++) {
                var j = 25 * fiche.eaffiche + i;
                arrayset(p.objets, j, doc.getElementById("idobjets" + j).value);
                arrayset(p.poidsobjets, j, doc.getElementById("idpoids" + j).value);
            }
        }
    },

    ebut: function (sac) {
        console.log("ebut" + sac);

        var doc = fiche.popup.doc;

        var ediv = doc.getElementById("ediv");
        fiche.esauve();
        fiche.eaffiche = sac;
        var contenu = "<center>Sac #" + (sac + 1) + "&ensp;<input id='sacnom' type='text' size='30'/>";
        contenu += "&emsp;Pds <input id='sacpoids' type='checkbox'/>&ensp;<span id='sacpds'>0 kg</span></center>";
        contenu += "<table style='font-size: 80%'>";
        contenu += "<tr><td>Objet</td><td>Poids</td></tr>";
        for (var i = 0; i < 25 ; i++) {
            var j = 25 * sac + i;
            contenu += "<tr><td><input type='text' id='idobjets" + j + "' size='50'/></td>";
            contenu += "<td><input type='text' id='idpoids" + j + "' size='4'/></td></tr>";
        }
        contenu += "</table>";
        ediv.innerHTML = contenu;
        doc.getElementById("sacnom").value = arrayget(p.sacoches, sac);
        doc.getElementById("sacpoids").checked = (arrayget(p.sacochescompte, sac) == "1");
        doc.getElementById("sacpoids").onchange = new Function("fiche.esauve(); fiche.majEquip();");
        for (var i = 0; i < 25 ; i++) {
            var j = 25 * sac + i;
            doc.getElementById("idobjets" + j).value = arrayget(p.objets, j);
            doc.getElementById("idpoids" + j).value = arrayget(p.poidsobjets, j);
            doc.getElementById("idpoids" + j).onchange = new Function("fiche.esauve(); fiche.majEquip();");
        }

        fiche.majEquip();
    },

    etri: function () {
        var sac = fiche.eaffiche;
        fiche.esauve();
        for (var i = 25 * sac; i < 25 * (sac + 1) - 1; i++)
            for (var j = i + 1; j < 25 * (sac + 1) ; j++) {
                var swap = false;
                var videi = (arrayget(p.objets, i) == "");
                var videj = (arrayget(p.objets, j) == "");
                swap = (!videj) && (videi || (no_accent(arrayget(p.objets, i)) > no_accent(arrayget(p.objets, j))));
                if (swap) {
                    var tmp = arrayget(p.objets, i);
                    arrayset(p.objets, i, arrayget(p.objets, j));
                    arrayset(p.objets, j, tmp);
                    tmp = arrayget(p.poidsobjets, i);
                    arrayset(p.poidsobjets, i, arrayget(p.poidsobjets, j));
                    arrayset(p.poidsobjets, j, tmp);
                }
            }
        fiche.eaffiche = -1;
        fiche.ebut(sac);
    },

    evide: function () {
        var sac = fiche.eaffiche;
        if (fiche.popup.window.confirm("Voulez-vous vraiment effacer tous les objets de la sacoche #" + (sac + 1) + " ?")) {
            for (var i = 25 * sac; i < 25 * (sac + 1) ; i++) {
                arrayset(p.objets, i, "");
                arrayset(p.poidsobjets, i, "0");
            }
        }
        fiche.eaffiche = -1;
        fiche.ebut(sac);
    },

    majEquip: function () {
        var doc = fiche.popup.doc;

        var tot = 0;
        var totsac = 0;
        for (var i = 0; i < 25; i++) {
            var j = fiche.eaffiche * 25 + i;
            totsac += parseFloat(arrayget(p.poidsobjets, j));
        }
        doc.getElementById("sacpds").innerHTML = "" + totsac + " kg";
        for (var i = 0; i < fiche.ptab.length; i++)
            tot += parseFloat(arrayget(p.poidsparure, i));
        for (var sac = 0; sac < 6; sac++)
            if (arrayget(p.sacochescompte, sac) == "1")
                for (var i = 0; i < 25; i++) {
                    var j = sac * 25 + i;
                    tot += parseFloat(arrayget(p.poidsobjets, j));
                }
        tot += parseFloat(p.poidsrichesses);
        tot = Math.round(tot * 100) / 100;
        doc.getElementById("poidstotal").innerHTML = "" + tot + " kg";
        var forc = parseInt(p.force);
        var mult = 1;
        while (forc > 29) {
            forc = forc - 10;
            mult = mult * 4;
        }
        var chm = parseFloat(arrayget(fiche.chmoytab, forc - 1)) * mult * arrayget(fiche.chmodtailletab, parseInt(p.ctaille));
        var chl = parseFloat(arrayget(fiche.chloutab, forc - 1)) * mult * arrayget(fiche.chmodtailletab, parseInt(p.ctaille));
        var chx = parseFloat(arrayget(fiche.chmaxtab, forc - 1)) * mult * arrayget(fiche.chmodtailletab, parseInt(p.ctaille));
        doc.getElementById("chval").innerHTML = "Charge moyenne " + chm + "kg, lourde " + chl + " kg, max " + chx + " kg";
        if (tot < chm)
            doc.getElementById("charge").innerHTML = "= charge légère (pas de pénalité)";
        else if (tot < chl)
            doc.getElementById("charge").innerHTML = "= charge moyenne (Max Dex +3, pénalité -3, course ×4, VD réduite)";
        else if (tot < chx)
            doc.getElementById("charge").innerHTML = "= charge lourde (Max Dex +1, pénalité -6, course ×3, VD réduite)";
        else
            doc.getElementById("charge").innerHTML = "= charge extrême (ne peut se déplacer)";
    },

    bCompa: function () {
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        fiche.sauve();
        vide(main);
        fiche.affiche = 9;
        $(main).css("border", "1px solid #3b3124");
        var contenu = "<table width='100%'><tr><td>";
        contenu += "<table width='100%'>";
        contenu += "<tr>";
        contenu += "<td width='24%'>";
        contenu += "<i style='font-size: 85%'>Identité</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>Nom</td>";
        contenu += "<td><input type='text' id='compnom' size='15'/></td></tr>";
        contenu += "<tr><td>Relation</td>";
        contenu += "<td><input type='text' id='comprelation' size='15'/></td></tr>";
        contenu += "<tr><td>Race</td>";
        contenu += "<td><input type='text' id='comprace' size='15'/></td></tr>";
        contenu += "<tr><td>Type</td>";
        contenu += "<td><input type='text' id='comptype' size='15'/></td></tr>";
        contenu += "<tr><td>Taille</td>";
        contenu += "<td><input type='text' id='comptaille' size='15'/></td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='24%'>";
        contenu += "<i style='font-size: 85%'>Exploration</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>Init</td>";
        contenu += "<td><input type='text' id='compinit' size='16'/></td></tr>";
        contenu += "<tr><td>VD</td>";
        contenu += "<td><input type='text' id='compvd' size='16'/></td></tr>";
        contenu += "<tr><td>Vision</td>";
        contenu += "<td><input type='text' id='compvision' size='16'/></td></tr>";
        contenu += "<tr><td colspan='2'>";
        contenu += "<textarea rows='2'" + fiche.tastyle + "id = 'idcomp1'></textarea>";
        contenu += "</td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='24%'>";
        contenu += "<i style='font-size: 85%'>Jets de sauvegarde</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>Réf</td>";
        contenu += "<td><input type='text' id='compref' size='18'/></td></tr>";
        contenu += "<tr><td>Vig</td>";
        contenu += "<td><input type='text' id='compvig' size='18'/></td></tr>";
        contenu += "<tr><td>Vol</td>";
        contenu += "<td><input type='text' id='compvol' size='18'/></td></tr>";
        contenu += "<tr><td colspan='2'>";
        contenu += "<textarea rows='2'" + fiche.tastyle + "id = 'idcomp2'></textarea>";
        contenu += "</td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td width='1%'></td>";
        contenu += "<td width='24%'>";
        contenu += "<i style='font-size: 85%'>Points de vie</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>pv</td>";
        contenu += "<td><input type='text' id='comppv' size='15'/></td></tr>";
        contenu += "<tr><td>pvmax</td>";
        contenu += "<td><input type='text' id='comppvmax' size='15'/></td></tr>";
        contenu += "<tr><td>Non-létal</td>";
        contenu += "<td><input type='text' id='compdgnl' size='15'/></td></tr>";
        contenu += "<tr><td colspan='2'>";
        contenu += "<textarea rows='2'" + fiche.tastyle + "id = 'idcomp3'></textarea>";
        contenu += "</td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "</tr>";
        contenu += "<tr>"
        contenu += "<td>";
        contenu += "<i style='font-size: 85%'>Caractéristiques</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>For</td>";
        contenu += "<td><input type='text' id='compfor' size='18'/></td></tr>";
        contenu += "<tr><td>Dex</td>";
        contenu += "<td><input type='text' id='compdex' size='18'/></td></tr>";
        contenu += "<tr><td>Con</td>";
        contenu += "<td><input type='text' id='compcon' size='18'/></td></tr>";
        contenu += "<tr><td>Int</td>";
        contenu += "<td><input type='text' id='compint' size='18'/></td></tr>";
        contenu += "<tr><td>Sag</td>";
        contenu += "<td><input type='text' id='compsag' size='18'/></td></tr>";
        contenu += "<tr><td>Cha</td>";
        contenu += "<td><input type='text' id='compcha' size='18'/></td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td></td>";
        contenu += "<td>";
        contenu += "<i style='font-size: 85%'>Valeurs de combat</i>";
        contenu += "<table width='100%' style='border: 1px solid #4b3124'>";
        contenu += "<tr><td>BBA</td>";
        contenu += "<td><input type='text' id='compbba' size='14'/></td></tr>";
        contenu += "<tr><td>BMO</td>";
        contenu += "<td><input type='text' id='compbmo' size='14'/></td></tr>";
        contenu += "<tr><td>DMD</td>";
        contenu += "<td><input type='text' id='compdmd' size='14'/></td></tr>";
        contenu += "<tr><td>CA</td>";
        contenu += "<td><input type='text' id='compca' size='14'/></td></tr>";
        contenu += "<tr><td>CA contact</td>";
        contenu += "<td><input type='text' id='compcacontact' size='14'/></td></tr>";
        contenu += "<tr><td>CA surpris</td>";
        contenu += "<td><input type='text' id='compcasurpris' size='14'/></td></tr>";
        contenu += "</table>";
        contenu += "</td>";
        contenu += "<td></td>";
        contenu += "<td colspan='3'>";
        contenu += "<i style='font-size: 85%'>Attaques</i>";
        contenu += "<textarea rows='9'" + fiche.tastyle + "id = 'idcomp4'></textarea>";
        contenu += "</td>";
        contenu += "</tr>";
        contenu += "<tr>";
        contenu += "<td>";
        contenu += "<i style='font-size: 85%'>Compétences</i>";
        contenu += "<textarea rows='8'" + fiche.tastyle + "id = 'idcomp5'></textarea>";
        contenu += "</td>";
        contenu += "<td></td>";
        contenu += "<td>";
        contenu += "<i style='font-size: 85%'>Dons</i>";
        contenu += "<textarea rows='8'" + fiche.tastyle + "id = 'idcomp6'></textarea>";
        contenu += "</td>";
        contenu += "<td></td>";
        contenu += "<td colspan='3'>";
        contenu += "<i style='font-size: 85%'>Capacités spéciales</i>";
        contenu += "<textarea rows='8'" + fiche.tastyle + "id = 'idcomp7'></textarea>";
        contenu += "</td>";
        contenu += "</tr>";
        contenu += "<tr>";
        contenu += "<td colspan='7'>";
        contenu += "<i style='font-size: 85%'>Notes</i>";
        contenu += "<textarea rows='8'" + fiche.tastyle + "id = 'idcomp8'></textarea>";
        contenu += "</td>";
        contenu += "</tr>";
        contenu += "</table>";
        contenu += "</td></tr></table>";
        $(main).html(contenu);
        doc.getElementById("compnom").value = p.compnom;
        doc.getElementById("comprelation").value = p.comprelation;
        doc.getElementById("comprace").value = p.comprace;
        doc.getElementById("comptype").value = p.comptype;
        doc.getElementById("comptaille").value = p.comptaille;
        doc.getElementById("compinit").value = p.compinit;
        doc.getElementById("compvd").value = p.compvd;
        doc.getElementById("compvision").value = p.compvision;
        doc.getElementById("idcomp1").value = p.idcomp1;
        doc.getElementById("compref").value = p.compref;
        doc.getElementById("compvig").value = p.compvig;
        doc.getElementById("compvol").value = p.compvol;
        doc.getElementById("idcomp2").value = p.idcomp2;
        doc.getElementById("comppv").value = p.comppv;
        doc.getElementById("comppvmax").value = p.comppvmax;
        doc.getElementById("compdgnl").value = p.compdgnl;
        doc.getElementById("idcomp3").value = p.idcomp3;
        doc.getElementById("compfor").value = p.compfor;
        doc.getElementById("compdex").value = p.compdex;
        doc.getElementById("compcon").value = p.compcon;
        doc.getElementById("compint").value = p.compint;
        doc.getElementById("compsag").value = p.compsag;
        doc.getElementById("compcha").value = p.compcha;
        doc.getElementById("compbba").value = p.compbba;
        doc.getElementById("compbmo").value = p.compbmo;
        doc.getElementById("compdmd").value = p.compdmd;
        doc.getElementById("compca").value = p.compca;
        doc.getElementById("compcacontact").value = p.compcacontact;
        doc.getElementById("compcasurpris").value = p.compcasurpris;
        doc.getElementById("idcomp4").value = p.idcomp4;
        doc.getElementById("idcomp5").value = p.idcomp5;
        doc.getElementById("idcomp6").value = p.idcomp6;
        doc.getElementById("idcomp7").value = p.idcomp7;
        doc.getElementById("idcomp8").value = p.idcomp8;
    },

    bNotes: function () {
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        fiche.sauve();
        vide($("#main", doc));
        fiche.affiche = 7;
        main.style.border = "0";
        var ta = doc.createElement("textarea");
        ta.style.width = "100%";
        ta.style.backgroundColor = "#f3efe2";
        ta.id = "idnotes";
        ta.rows = "40";
        ta.style.fontfamily = "monospace";
        main.appendChild(ta);
        ta.value = p.notes;
    },

    onCodeButtonClick: function () {
        var doc = fiche.popup.doc;
        var main = fiche.popup.main;

        fiche.sauve();
        vide($("#main", doc));
        fiche.affiche = 8;
        main.style.border = "0";
        var contenu = "<table width='100%'><tr><td width='24%'>";
        contenu += "<i style='font-size: 85%'>Blocs de texte <button type='button' style='font-size: 80%; float:right' id='razbt'>valeurs par défaut</button></i>";
        contenu += "<table style='border: 1px solid #4b3124; clear: right' width='100%'>";
        contenu += "<tr><td>Couleur</td><td colspan='2'><input type='text' id='idtabc' size='12'/></td></tr>";
        contenu += "<tr><td>Taille police</td>";
        contenu += butpm("tafs-plus", "tafs-moins");
        contenu += "<td id='idtafs'></td>";
        contenu += "</tr></table>";
        contenu += "</td><td width='1%'></td>";
        contenu += "<td width='24%'>";
        contenu += "<i style='font-size: 85%'>Réinitialisation</i>";
        contenu += "<table style='border: 1px solid #4b3124' width='100%'>";
        contenu += "<tr><td><button id='razequip' type='button'>équipement</button></td>";
        contenu += "<td><button id='razsorts' type='button'>sorts</button></td></tr>";
        contenu += "<tr><td><button id='razcomp' type='button'>compagnon</button></td>";
        contenu += "<td><button id='raztout' type='button'>tout</button></td></tr>";
        contenu += "</table>";
        contenu += "</td><td width='1%'></td>";
        contenu += "<td width='49%'>";
        contenu += "<i style='font-size: 85%'>Affichage</i>";
        contenu += "<table style='border: 1px solid #4b3124' width='100%'>";
        contenu += "<tr><td><input type='checkbox' id='bshowmagie'> Afficher Magie</td>";
        contenu += "<td><input type='checkbox' id='bshowmagempty'> Afficher niveaux vides</td></tr>";
        contenu += "<tr><td><input type='checkbox' id='bshowcomp'> Afficher Compagnon</td></tr>";
        contenu += "</table>";
        contenu += "</tr></table>";
        contenu += "<table width='100%'><tr><td colspan='7'>";
        contenu += "<i style='font-size: 85%'>Code à copier dans la page wiki</i>";
        contenu += "<textarea rows='36'" + fiche.tastyle + "id = 'idcode'></textarea>";
        contenu += "</td></tr></table>";
        main.innerHTML = contenu;
        fiche.majCode();
        $("#tafs-plus", doc).on("click", function () {
            fiche.tafs = modif(fiche.tafs, 1);
            fiche.majCode();
        });
        $("#tags-moins", doc).on("click", function () {
            fiche.tafs = modif(fiche.tafs, -1);
            fiche.majCode();
        });
        //doc.getElementById("tafs-plus").onclick = new Function("tafs = modif(tafs,1); majCode();");
        doc.getElementById("tafs-moins").onclick = new Function("fiche.tafs = modif(fiche.tafs,-1); fiche.majCode();");
        doc.getElementById("idtabc").onchange = new Function("fiche.tabc = doc.getElementById('idtabc').value; fiche.majCode();");
        doc.getElementById("razbt").onclick = new Function("fiche.tafs = '90'; fiche.tabc = '#f3efe2'; fiche.majCode();");
        doc.getElementById("razequip").onclick = new Function("fiche.razequip(); fiche.majCode();");
        doc.getElementById("razsorts").onclick = new Function("fiche.razsorts(); fiche.majCode();");
        doc.getElementById("razcomp").onclick = new Function("fiche.razcomp(); fiche.majCode();");
        doc.getElementById("raztout").onclick = new Function("fiche.raztout(); fiche.majCode();");
        doc.getElementById("bshowmagie").onclick = new Function("p.showmagie = (p.showmagie == '0' ? '1' : '0'); fiche.majCode();");
        doc.getElementById("bshowmagempty").onclick = new Function("p.showmagempty = (p.showmagempty == '0' ? '1' : '0'); fiche.majCode();");
        doc.getElementById("bshowcomp").onclick = new Function("p.showcomp = (p.showcomp == '0' ? '1' : '0'); fiche.majCode();");
    },

    majCode: function () {
        /// <summary>Génère le code pour la fiche de personnage courante.</summary>
        var doc = fiche.popup.doc;

        doc.getElementById("idtabc").value = fiche.tabc;
        doc.getElementById("idtafs").innerHTML = fiche.tafs;

        var code = JSON.stringify(p);

        var code = code
        /*  
        .replace(/\u005b/g, "00LBR00")
        .replace(/\u005d/g, "00RBR00")
        .replace(/'/g, "00GUI00")
        .replace(/{/g, "00LCB00")
        .replace(/\\/g, "\\\\")
        */
        ;

        var sortie = "{s:FDPavant4}<nowiki>\n" +
            "tabc = '" + fiche.tabc + "';\n" +
            "tafs = '" + fiche.tafs + "';\n" +
            "pdesc = " + code + ";\n" +
            "</nowiki>{s:FDPapres4}\n";

        doc.getElementById("idcode").value = sortie;
        doc.getElementById("idcode").style.backgroundColor = fiche.tabc;
        doc.getElementById("idcode").style.fontSize = fiche.tafs + "%";
        fiche.tastyle = " style='font-family: monospace; width: 100%; background-color: " + fiche.tabc + "; font-size: " + fiche.tafs + "%' ";
        if (p.showmagie == "1") {
            doc.getElementById("bshowmagie").checked = "checked";
            doc.getElementById("bshowmagempty").checked = (p.showmagempty == "1" ? "checked" : "");
            doc.getElementById("bshowmagempty").disabled = "";
        } else {
            doc.getElementById("bshowmagie").checked = "";
            doc.getElementById("bshowmagempty").checked = (p.showmagempty == "1" ? "checked" : "");
            doc.getElementById("bshowmagempty").disabled = "disabled";
        }
        doc.getElementById("bshowcomp").checked = (p.showcomp == "1" ? "checked" : "");
    },

    razequip: function () {
        if (fiche.popup.window.confirm("Voulez-vous vraiment effacer toutes les informations concernant l'équipement ?")) {
            p.parure = new Array(20);
            p.poidsparure = new Array(20);
            p.objets = new Array(150);
            p.poidsobjets = new Array(150);
            p.sacoches = new Array(6);
            p.sacochescompte = new Array(6);
            p.maxdexarmure = "";
            p.pénalitéarmure = "";
            p.échecsortsarmure = "";
            p.maxdexbouclier = "";
            p.pénalitébouclier = "";
            p.échecsortsbouclier = "";
            p.richesses = "";
            p.poidsrichesses = "0";
            p.noteséquipement = "";
            for (var i = 0; i < 6; i++) {
                arrayset(p.sacoches, i, "");
                arrayset(p.sacochescompte, i, "1");
            }
            for (var i = 0; i < 20; i++) {
                arrayset(p.parure, i, "");
                arrayset(p.poidsparure, i, "0");
            }
            for (var i = 0; i < 150; i++) {
                arrayset(p.objets, i, "");
                arrayset(p.poidsobjets, i, "0");
            }
        }
    },

    razsorts: function () {
        if (fiche.popup.window.confirm("Voulez-vous vraiment effacer toutes les informations concernant les sorts ?")) {
            p.sortsparjour = new Array(10);
            p.sortsconnus = new Array(10);
            p.dd = new Array(10);
            for (var i = 0; i < 10; i++) {
                arrayset(p.sortsparjour, i, "");
                arrayset(p.sortsconnus, i, "");
                arrayset(p.dd, i, "");
            }
            p.domaines = "";
            p.sorts = "";
            p.notessorts = "";
            p.conc = "";
            p.notessortsniv = new Array(10);
            for (var i = 0; i < 10; i++)
                arrayset(p.notessortsniv, i, "");
            p.snom = new Array(500);
            p.snote = new Array(500);
            p.sprep = new Array(500);
            p.slanc = new Array(500);
            p.surl = new Array(500);
            for (var i = 0; i < 500; i++) {
                arrayset(p.snom, i, "");
                arrayset(p.snote, i, "");
                arrayset(p.sprep, i, "0");
                arrayset(p.slanc, i, "0");
                arrayset(p.surl, i, "");
            }
        }
    },

    razcomp: function () {
        if (fiche.popup.window.confirm("Voulez-vous vraiment effacer toutes les informations concernant le compagnon ?")) {
            p.compnom = "";
            p.comprelation = "";
            p.comprace = "";
            p.comptype = "";
            p.comptaille = "";
            p.compinit = "";
            p.compvd = "";
            p.compvision = "";
            p.idcomp1 = "";
            p.compref = "";
            p.compvig = "";
            p.compvol = "";
            p.idcomp2 = "";
            p.comppv = "";
            p.comppvmax = "";
            p.compdgnl = "";
            p.idcomp3 = "";
            p.compfor = "";
            p.compdex = "";
            p.compcon = "";
            p.compint = "";
            p.compsag = "";
            p.compcha = "";
            p.compbba = "";
            p.compbmo = "";
            p.compdmd = "";
            p.compca = "";
            p.compcacontact = "";
            p.compcasurpris = "";
            p.idcomp4 = "";
            p.idcomp5 = "";
            p.idcomp6 = "";
            p.idcomp7 = "";
            p.idcomp8 = "";
        }
    },

    raztout: function () {
        if (fiche.popup.window.confirm("Voulez-vous vraiment effacer toutes les informations de cette feuille de personnage ?")) {
            p = new perso();
        }
    },

    sauve: function () {
        var doc = fiche.popup.doc;

        switch (fiche.affiche) {
            case 1:
                p.nom = doc.getElementById("idnom").value;
                p.race = doc.getElementById("idrace").value;
                p.sexe = doc.getElementById("idsexe").value;
                p.ctaille = "" + doc.getElementById("idctaille").selectedIndex;
                p.joueur = doc.getElementById("idjoueur").value;
                p.md = doc.getElementById("idmd").value;
                p.partie = doc.getElementById("idpartie").value;
                p.classes = doc.getElementById("idclasses").value;
                p.cdp = doc.getElementById("idcdp").value;
                p.religion = doc.getElementById("idreligion").value;
                p.origine = doc.getElementById("idorigine").value;
                p.align = doc.getElementById("idalign").value;
                p.age = doc.getElementById("idage").value;
                p.dextrie = doc.getElementById("iddextrie").value;
                p.poids = doc.getElementById("idpoids").value;
                p.taille = doc.getElementById("idtaille").value;
                p.yeux = doc.getElementById("idyeux").value;
                p.cheveux = doc.getElementById("idcheveux").value;
                p.peau = doc.getElementById("idpeau").value;
                p.noteidentité = doc.getElementById("idnoteidentité").value;
                break;

            case 2:
                p.initnote = doc.getElementById("idinitnote").value;
                p.vd = doc.getElementById("idvd").value;
                p.vision = doc.getElementById("idvision").value;
                p.notesexplo = doc.getElementById("idnotesexplo").value;
                p.refnote = doc.getElementById("idrefnote").value;
                p.vignote = doc.getElementById("idvignote").value;
                p.volnote = doc.getElementById("idvolnote").value;
                p.notesjds = doc.getElementById("idnotesjds").value;
                p.pv = doc.getElementById("idpv").value;
                p.pvmax = doc.getElementById("idpvmax").value;
                p.dgnl = doc.getElementById("iddgnl").value;
                p.notespv = doc.getElementById("idnotespv").value;
                p.bmo = doc.getElementById("idbmo").value;
                p.dmd = doc.getElementById("iddmd").value;
                p.ca = doc.getElementById("idca").value;
                p.casurpris = doc.getElementById("idcasurpris").value;
                p.cacontact = doc.getElementById("idcacontact").value;
                p.notescombat = doc.getElementById("idnotescombat").value;
                p.notescombat2 = doc.getElementById("idnotescombat2").value;
                p.armes = doc.getElementById("idarmes").value;
                break;

            case 3:
                p.traits = doc.getElementById("idtraits").value;
                p.cpmartiales = doc.getElementById("idcpmartiales").value;
                p.capacités = doc.getElementById("idcapacités").value;
                p.dons = doc.getElementById("iddons").value;
                p.langues = doc.getElementById("idlangues").value;
                p.notescapacités = doc.getElementById("idnotescapacités").value;
                break;

            case 4:
                // Pour chaque compétence connue, on va affecter les valeurs à la fiche
                for (var i = 0; i < fiche.ctab.length; i++) {
                    // nom de la compétence, au format regexp "(?<Inne>I?)(?<Ajout>\*?)(?<Nom>)
                    var nom = fiche.ctab[i];
                    if (nom.substring(0, 1) == "I") {
                        nom = nom.substring(1);
                    }
                    var ajout = (nom.substring(1, 2) == "*");
                    if (ajout) {
                        p.cnom[i] = doc.getElementById("idcnom" + i).value;
                    }
                    p.cnote[i] = doc.getElementById("idcnote" + i).value;
                }
                p.notescompétences = doc.getElementById("idnotescompétences").value;
                break;

            case 5:
                for (var i = 0; i < 10; i++) {
                    arrayset(p.dd, i, doc.getElementById("dd" + i).value);
                    arrayset(p.sortsparjour, i, doc.getElementById("sortsparjour" + i).value);
                    arrayset(p.sortsconnus, i, doc.getElementById("sortsconnus" + i).value);
                }
                p.conc = doc.getElementById("conc").value;
                p.notessorts = doc.getElementById("idnotessorts").value;
                p.domaines = doc.getElementById("iddomaines").value;
                fiche.ssauve();
                break;

            case 6:
                for (var i = 0; i < fiche.ptab.length ; i++) {
                    var titre = (arrayget(fiche.ptab, i).substring(0, 1) == "*");
                    if (!titre) {
                        arrayset(p.parure, i, doc.getElementById("idparure" + i).value);
                        arrayset(p.poidsparure, i, doc.getElementById("idpoidsparure" + i).value);
                    }
                }
                fiche.esauve();
                p.maxdexarmure = doc.getElementById("idmaxdexarmure").value;
                p.pénalitéarmure = doc.getElementById("idpénalitéarmure").value;
                p.échecsortsarmure = doc.getElementById("idéchecsortsarmure").value;
                p.maxdexbouclier = doc.getElementById("idmaxdexbouclier").value;
                p.pénalitébouclier = doc.getElementById("idpénalitébouclier").value;
                p.échecsortsbouclier = doc.getElementById("idéchecsortsbouclier").value;
                p.richesses = doc.getElementById("idrichesses").value;
                p.poidsrichesses = doc.getElementById("idpoidsrichesses").value;
                p.noteséquipement = doc.getElementById("idnoteséquipement").value;
                break;

            case 7:
                p.notes = doc.getElementById("idnotes").value;
                break;

            case 9:
                p.compnom = doc.getElementById("compnom").value;
                p.comprelation = doc.getElementById("comprelation").value;
                p.comprace = doc.getElementById("comprace").value;
                p.comptype = doc.getElementById("comptype").value;
                p.comptaille = doc.getElementById("comptaille").value;
                p.compinit = doc.getElementById("compinit").value;
                p.compvd = doc.getElementById("compvd").value;
                p.compvision = doc.getElementById("compvision").value;
                p.idcomp1 = doc.getElementById("idcomp1").value;
                p.compref = doc.getElementById("compref").value;
                p.compvig = doc.getElementById("compvig").value;
                p.compvol = doc.getElementById("compvol").value;
                p.idcomp2 = doc.getElementById("idcomp2").value;
                p.comppv = doc.getElementById("comppv").value;
                p.comppvmax = doc.getElementById("comppvmax").value;
                p.compdgnl = doc.getElementById("compdgnl").value;
                p.idcomp3 = doc.getElementById("idcomp3").value;
                p.compfor = doc.getElementById("compfor").value;
                p.compdex = doc.getElementById("compdex").value;
                p.compcon = doc.getElementById("compcon").value;
                p.compint = doc.getElementById("compint").value;
                p.compsag = doc.getElementById("compsag").value;
                p.compcha = doc.getElementById("compcha").value;
                p.compbba = doc.getElementById("compbba").value;
                p.compbmo = doc.getElementById("compbmo").value;
                p.compdmd = doc.getElementById("compdmd").value;
                p.compca = doc.getElementById("compca").value;
                p.compcacontact = doc.getElementById("compcacontact").value;
                p.compcasurpris = doc.getElementById("compcasurpris").value;
                p.idcomp4 = doc.getElementById("idcomp4").value;
                p.idcomp5 = doc.getElementById("idcomp5").value;
                p.idcomp6 = doc.getElementById("idcomp6").value;
                p.idcomp7 = doc.getElementById("idcomp7").value;
                p.idcomp8 = doc.getElementById("idcomp8").value;
                break;
        }
    },

}

function bwiki(url) {
    /// <summary>Génère le code HTML pour une balise image pointant vers le wiki avec l'url indiquée.</summary>
    return ("<img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/BoutonW.jpg' class='bwikilink' data-url='" + url + "'/>");
}

/*
jQuery.fn.removeAll = function () {
    this.each(function () {
        var newEl = this.cloneNode(false);
        if (this.parentNode) this.parentNode.replaceChild(newEl, this);
    });
};
*/

function vide(o) {
    if ($(o)[0]) {
        $(o)[0].textContent = '';
    }
    //$(o).removeAll();
    //var children = o.childNodes;
    //for (var i = 0; i < children.length; i++) o.removeChild(arrayget(children, i));
}

function statmod(v) {
    return (Math.floor(v / 2 - 5));
}

function statmodecho(v) {
    var sm = statmod(v);
    if (sm >= 0)
        return ("+" + sm);
    else
        return ("" + sm);
}

function statecho(v) {
    return ("<b>" + v + "</b> (" + statmodecho(v) + ")");
}

function modif(v, a) {
    var val = parseInt(v);
    return ("" + (val + a));
}

function zaffiche(v) {
    if (v >= 0)
        return ("+" + v);
    else
        return ("" + v);
}

function butpm(idp, idm) {
    /// <summary>Renvoie une chaine contenant le code HTML pour afficher une cellule de tableau contenant deux boutons "+" et "-".</summary>
    var result = "<td align='center'><table cellpadding='0px'>";
    result += "<tr><td><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/BoutonP.jpg' width='8px' id='" + idp + "'/></td></tr>";
    result += "<tr><td><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/BoutonM.jpg' width='8px' id='" + idm + "'/></td></tr>";
    result += "</table></td>";
    return (result);
}

function butpme(idp, idm, ide) {
    var result = "<td align='center'><table cellpadding='0px'>";
    result += "<tr><td><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/BoutonP.jpg' width='8px' id='" + idp + "'/></td>";
    result += "<td rowspan='2'><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/BoutonE.jpg' width='8px' id='" + ide + "'/></td></tr>";
    result += "<tr><td><img src='http://www.pathfinder-fr.org/images/pathfinder/wiki/BoutonM.jpg' width='8px' id='" + idm + "'/></td></tr>";
    result += "</table></td>";
    return (result);
}

function no_accent(my_string) {
    var new_string = "";
    var pattern_accent = new Array("é", "è", "ê", "ë", "ç", "à", "â", "ä", "î", "ï", "ù", "ô", "ó", "ö", "É", "È", "Ê", "Ô", "À");
    var pattern_replace_accent = new Array("e", "e", "e", "e", "c", "a", "a", "a", "i", "i", "u", "o", "o", "o", "E", "E", "E", "O", "A");
    if (my_string && my_string != "") {
        new_string = preg_replace(pattern_accent, pattern_replace_accent, my_string);
    }
    return new_string;
}

function preg_replace(array_pattern, array_pattern_replace, my_string) {
    var new_string = String(my_string);
    for (i = 0; i < array_pattern.length; i++) {
        var reg_exp = RegExp(arrayget(array_pattern, i), "gi");
        var val_to_replace = arrayget(array_pattern_replace, i);
        new_string = new_string.replace(reg_exp, val_to_replace);
    }
    return new_string;
}

function modifvis(id) {
    var target = document.getElementById(id);
    $("#" + id).slideToggle("normal");
}

function arrayset(tab, i, v) {
    tab[i] = v;
}

function arrayget(tab, i) {
    return tab[i];
}