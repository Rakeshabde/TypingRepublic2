var Game = new function () {
        function L() {
            O();
            U(d);
            z();
            j()
        }

        function A() {
            if (!T) return false;
            if (createjs.Ticker.getPaused()) {
                D();
                k.published.fadeOut();
                $(y).css("opacity", 1);
                createjs.Ticker.setPaused(false)
            } else {
                createjs.Ticker.setPaused(true);
                $(y).css("opacity", 0);
                _("Click to unpause")
            }
        }

        function O() {
            y = $("#stage").get(0);
            w = new createjs.Rectangle;
            b = new createjs.Stage(y);
            k.controls = $("#controls");
            k.score = $("#score");
            k.notice = $("#notice");
            k.level = $("#level");
            k.words = $("#words");
            k.accuracy = $("#accuracy");
            k.speed = $("#speed");
            k.publish = $("#publish .fb");
            k.published = $("#published");
            k.start_box = $(".start");
            k.sound = $("#sound");
            k.tips = $("#tips");
            k.tip = $("#tip");
            $("#start").click(function () {
                k.start_box.remove();
                k.publish.show();
                H("Prepare to start typing ...");
                window.setTimeout(function () {
                    T = true;
                    createjs.Ticker.setFPS(r);
                    createjs.Ticker.addListener(R, true);
                    document.onkeydown = Y
                }, 3e3)
            });
            k.published.find("a").click(function () {
                window.open($(this).attr("href"), "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");
                return false
            });
            k.sound.click(function () {
                if ($(this).is(":checked")) {
                    N = true
                } else {
                    N = false
                }
                localStorage.sound = N
            });
            if (typeof localStorage.sound == "undefined" || localStorage.sound == "true") {
                k.sound.attr("checked", true);
                N = true
            } else {
                k.sound.attr("checked", false);
                N = false
            }
            k.tips.click(function () {
                k.tip.text("");
                if ($(this).is(":checked")) {
                    C = true
                } else {
                    C = false
                }
                localStorage.tips = C
            });
            if (typeof localStorage.tips == "undefined" || localStorage.tips == "false") {
                k.tips.attr("checked", false);
                C = false
            } else {
                k.tips.attr("checked", true);
                C = true
            }
            k.publish.click(function () {
                if (!createjs.Ticker.getPaused()) A();
                if (d < 1) {
                    alert("You need to reach a minimum of level 3 to publish your score.")
                } else {
					//alert("saf")
                     k.publish.attr("href", "https://facebook.com/sharer.php?t=" + encodeURIComponent("I scored " +k.score+ " at (Level " + k.level + ") with " + k.accuracy + "% accuracy and a speed of " + k.speed + " wpm at Typo express!") + "&u=" + encodeURIComponent(n));
                }
            });
            $(y).click(function () {
                A()
            });
            var e = new Audio;
            e.src = "sounds/pressing." + (e.canPlayType("audio/mpeg") ? "mp3" : "ogg");
            for (var t = 0; t < 15; t++) {
                E.push($(e).clone().get(0))
            }
            E.p = 1;
            M();
            $(window).resize(M)
        }

        function M() {
            y.width = $(window).width();
           y.height = $(window).height();
		   
            w.width = y.width;
            w.height = y.height/1.5;
            e = Math.ceil(y.width * .019);
            n = Math.ceil(y.width * .022);
            t = e * .13;
            k.start_box ? k.start_box.css("top", ($(window).height() - k.start_box.height()) / 2).show() : null
        }

        function _(e) {
            k.notice.text(e).stop().fadeIn()
        }

        function D(e) {
            k.notice.fadeOut()
        }

        function P(e, t) {
            window.setTimeout(function () {
                H(e)
            }, t * 1e3)
        }

        function H(e) {
            window.notice_timer ? window.clearTimeout(window.notice_timer) : false;
            k.notice.text(e).fadeIn();
            window.notice_timer = window.setTimeout(function () {
                k.notice.fadeOut()
            }, 3e3)
        }

        function B(e) {//alert(e)
            if (!N) return;
            E[E.p - 1].pause();
            E[E.p - 1].load();
            E[E.p].play();
            if (E.p >= E.length - 1) {
                E.p = 1
            } else {
                E.p++
            }
        }

        function j() {
            k.level.text(d);
            k.score.text(v);
            k.words.text(h);
            k.accuracy.text((m / c * 100).toFixed(1) + "%");
            var e = (Math.round(p / 5, 0) / l * 60).toFixed(2);
            g = e * 1 == e ? e : 0;
            k.speed.text(g)
        }

        function F() {
            d++;
            H("Level " + d);
            j();
            U(d)
        }

        function I(r) {
            r = r.toUpperCase();
            var i = new createjs.Graphics;
            i.setStrokeStyle(t);
            i.beginStroke("#fff000");
            i.drawCircle(0, 0, e);
            var s = 100,
                o = [];
            for (var a = 0; a < r.length; a++) {
                var l = new createjs.Container,
                    h = new createjs.Shape(i),
                    p = new createjs.Text(r[a] == " " ? "_" : r[a], n + "px Arial", "#000fff");
                p.textBaseline = "middle";
                p.textAlign = "center";
                l.addChild(h);
                l.addChild(p);
                l.char = r[a];
                l.temp_x = s;
                l.y = 10;
                l.speed = et(d / 5 + 1, d / 5 + 3);
                o.push(l);
                b.addChild(l);
                s += e + et(e + 10, e * 2 + 20)
            }
            for (var a = 0; a < o.length; a++) {
                var l = o[a];
                l.x = l.temp_x + (y.width - s) / 2
            }
            o.pointer = 0;
            o.deleted = 0;
            o.bad = 0;
            f[r] = o;
            S = r;
            c++;
            if (c % u == 0) {
                F()
            }
            W()
        }

        function q(e) {
            if (!C || c == 1) return;
            k.tip.text(e)
        }

        function R() {
            for (var t in f) {
                if (!f.hasOwnProperty(t)) continue;
                for (var n = 0; n < f[t].length; n++) {
                    if (!f[t][n]) continue;
                    var r = f[t][n];
                    if (r.y - e > w.height) {//alert("ll come after reaching down")
                        f[t].deleted++;
                        b.removeChild(f[t][n]);
                        delete f[t][n]
                    } else {
                        r.y += r.speed
                    }
                }
                if (f[t].deleted == f[t].length) {
                    var i = f[S].pointer >= f[S].length;
                    delete f[t];
                    G(i)
                }
            }
            b.update()
        }

        function U(e) {
            if (e == 1) {
                a = THESAURUS.three
            } else if (e == 2) {
                P("Easy peasy!", 5)
            } else if (e == 3) {
                a = THESAURUS.small
            } else if (e == 4) {
                P("Not bad, ey?", 5)
            } else if (e == 5) {
                P("Make it rain!", 6);
                a = THESAURUS.medium
            } else if (e == 7) {
                P("Careful now!", 5)
            } else if (e == 8) {
                a = THESAURUS.large;
                P("Oh oh ...", 5)
            } else if (e == 10) {
                a = THESAURUS.big;
                P("Whew!", 5)
            } else if (e == 12) {
                P("Make it rain!", 5)
            } else if (e == 14) {
                a = THESAURUS.medium
            } else if (e == 15) {
                P("Watch the speed!", 5)
            } else if (e == 18) {
                P("You're still here!", 5)
            } else if (e == 20) {
                P("That's insane :O", 5)
            } else if (e == 30) {
                P("Don't stop now!", 5)
            } else if (e == 40) {
                P("You are the ONE", 5)
            } else if (e == 50) {
                P("Umm ... level 50", 5)
            } else if (e == 60) {
                P("You're still here!", 5)
            } else if (a.length < 2) {
                a = THESAURUS.medium
            }
            a = tt(a);
            a.index = 0
        }

        function z() {
            I(a[a.index]);
            a.index = a.index + 1 >= a.length ? 0 : a.index + 1;
            q(a[a.index])
        }

        function W() {
            x = nt()
        }

        function X() {
            l += nt() - x
        }

        function V(e) {
            var t = e.length * (C ? s / 2 : s);
            p += e.length;
            h++;
            X();
            v += t
        }

        function J(e) {
            B("pop");//alert(e)
        }

        function K(e) {
            V(e);
            m += 1;
            j()
        }

        function Q() {
            f[S].bad++;
            m -= f[S].bad / f[S].length
        }

        function G(e) {
            if (!e) {
                m -= 1;
                X()
            }
            j();
            z()
        }

        function Y(e) {
            if (!createjs.Ticker.getPaused()) {
                e.preventDefault()
            }
            if (e.keyCode == 32) {
                A();
                return
            }//alert("ds")
            if (!S || !f[S] || createjs.Ticker.getPaused()) return;
            if (e.keyCode < 65 || e.keyCode > 91) return;
            var t = String.fromCharCode(e.keyCode).toUpperCase();
            var n = f[S].pointer;
            if (!f[S][n]) return;
            if (f[S][n].char == t) {//alert(f[S].pointer)
                f[S][n].speed = 30;
                f[S].pointer++;
                J(t)
            } else {
                Q()
            } if (f[S].pointer >= f[S].length) {
                K(S)
            }
        }

        function Z() {
          /*  var e = prompt("Please enter a name", "Typo Express").replace(/[^a-z0-9_\.\-\s]|\s\s+/ig, ""),
                t = k.accuracy.text().replace("%", ""),
                n = "http://wordpluck.com/scores/?";
            $.post("scores/score.php", {
                name: e,
                data: rt([d, v, t, g, c - 1, h].join(".."))
            }, function (r) {
                if (!r) {
                    alert("There was a problem saving your score");
                    return
                }
                n += r;
                k.published.find(".url").val(n);
                k.published.find(".view").attr("href", n);
                k.published.find(".name").text(e);
                k.published.find(".fb").attr("href", "https://facebook.com/sharer.php?t=" + encodeURIComponent("I scored " + v + " at (Level " + d + ") with " + t + "% accuracy and a speed of " + g + " wpm at WordPluck!") + "&u=" + encodeURIComponent(n));
                k.published.find(".tweet").attr("href", "http://twitter.com/home?status=" + encodeURIComponent("I scored " + v + " at (Level " + d + ") with " + t + "% accuracy and a speed of " + g + " wpm at WordPluck! - " + n));
                k.published.find(".gplus").attr("href", "https://plus.google.com/share?url=" + encodeURIComponent(n));
                k.published.fadeIn()
            })*/
			//k.published.fadeIn()
			
        }

        function et(e, t) {
            return Math.floor(Math.random((new Date).getTime()) * (t - e) + e, 0)
        }

        function tt(e) {
            for (var t, n, r = e.length; r; t = parseInt(Math.random() * r), n = e[--r], e[r] = e[t], e[t] = n);
            return e
        }

        function nt(e) {
            var t = (new Date).getTime();
            var n = parseInt(t / 1e3);
            return t / 1e3
        }

        function rt(e) {
            var t = "";
            for (i = 0; i < e.length; i++) {
                var n = e.charCodeAt(i);
                var r = n ^ 123;
                t = t + (Math.random() < .5 ? String.fromCharCode(r).toLowerCase() : String.fromCharCode(r))
            }
            return t
        }
        this.init = function () {
            L()
        };
        var e = 30,
            t = 4,
            n = 36,
            r = 60,
            s = 10,
            o = 3,
            u = 15,
            a = ["hello"],
            f = {}, l = 0,
            c = 0,
            h = 0,
            p = 0,
            d = 1,
            v = 0,
            m = 0,
            g = 0,
            y = null,
            b = null,
            w = null,
            E = [],
            S = null,
            x = null,
            T = false,
            N = true,
            C = false,
            k = {};
    };
$(document).ready(function () {
    $("#controls").show();
    Game.init()
});