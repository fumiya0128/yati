"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function main(param) {
    var scene = new g.Scene({
        game: g.game,
        // このシーンで利用するアセットのIDを列挙し、シーンに通知します
        assetIds: ["saikoro1","saikoro2","saikoro3","saikoro4","saikoro5","saikoro6","rule"]
    });
    var time = 120; // 制限時間
    scene.message.add(function (msg) {
        if (msg.data && msg.data.type === "start" && msg.data.parameters && msg.data.parameters.totalTimeLimit) {
            time = msg.data.parameters.totalTimeLimit-5;//新市場用秒数 tTLは市場に常時される時間
        }
    });
    if (param.isAtsumaru) {
        time = 180;
    }
    g.game.vars.gameState = { score: 0 };//スコア初期値
    var kaisuu=0;//今回振った回数
    var turn=0;//ターン数
    var bonussum=0;
    scene.loaded.add(function () {//インデントの訂正(Ctrl+K, Ctrl+F)
        // ここからゲーム内容を記述します      
        var font = new g.DynamicFont({// フォントの生成
            game: g.game,
            fontFamily: g.FontFamily.Serif,
            size: 48
        });
        var haikei = new g.FilledRect({//haikei
            scene: scene,
            cssColor: "white",
            opacity:0.8,
            width: g.game.width,
            height: g.game.height,
        });
        scene.append(haikei);
        function dicegazou(index,place){//画像の追加
            if(index==1){
                var saikoro1 = new g.Sprite({
                    scene: scene,
                    src: scene.assets["saikoro1"],
                    tag:{im:1},
                    x:6,
                    y:6
                });
                place.append(saikoro1);
            }
            if(index==2){
                var saikoro2 = new g.Sprite({
                    scene: scene,
                    src: scene.assets["saikoro2"],
                    tag:{im:1},
                    x:6,
                    y:6
                });
                place.append(saikoro2);
            }
            if(index==3){
                var saikoro3 = new g.Sprite({
                    scene: scene,
                    src: scene.assets["saikoro3"],
                    tag:{im:1},
                    x:6,
                    y:6
                });
                place.append(saikoro3);
            }
            if(index==4){
                var saikoro4 = new g.Sprite({
                    scene: scene,
                    src: scene.assets["saikoro4"],
                    tag:{im:1},
                    x:6,
                    y:6
                });
                place.append(saikoro4);
            }
            if(index==5){
                var saikoro5 = new g.Sprite({
                    scene: scene,
                    src: scene.assets["saikoro5"],
                    tag:{im:1},
                    x:6,
                    y:6
                });
                place.append(saikoro5);
            }
            if(index==6){
                var saikoro6 = new g.Sprite({
                    scene: scene,
                    src: scene.assets["saikoro6"],
                    tag:{im:1},
                    x:6,
                    y:6
                });
                place.append(saikoro6);
            }
        }
        var mekazu = [0,0,0,0,0,0];//それぞれの目の数
        function createDice(index) {//ダイス生成関数(index番目のダイス生成)
			var dice = new g.Label({
                scene: scene,
                font: font,
                fontSize: 32,
                tag: {me:g.game.random.get(1, 6),diceid:index},//diceid何番目のダイスか
                text: "",
                x: 8,
                y: -2
            });
            var place = new g.FilledRect({//dice置き場
                scene: scene,
                x: index * 72-72,
                y: -8,
                width: 60,
                height: 60,
                tag: {text: ""},
                cssColor:"#dff",
                touchable: true
            });
            dice.text=""+dice.tag.me;//ダイスの目を文字列に変える
            dice.invalidate();//ダイステキスト更新
            place.append(dice);//placeにダイス追加
            dicegazou(dice.tag.me,place);
            mekazu[dice.tag.me-1]++;//
            return place;
        }
        function deleteDice(index) {//ダイス更新関数(index番目のダイス更新)
            placeContainer.children[index].children[1].destroy();//既存の画像の削除
            placeContainer.children[index].cssColor ="#dff";
            placeContainer.modified();
            mekazu[placeContainer.children[index].children[0].tag.me - 1]--;//消す目の数を減らす
            placeContainer.children[index].children[0].tag.me = g.game.random.get(1, 6);//目を更新
            placeContainer.children[index].children[0].text = "" + placeContainer.children[index].children[0].tag.me;
            placeContainer.children[index].children[0].invalidate();//テキスト更新
            dicegazou(placeContainer.children[index].children[0].tag.me,placeContainer.children[index]);//画像の追加
            mekazu[placeContainer.children[index].children[0].tag.me - 1]++;//出す目の数を増やす
            if (button1.cssColor === "lime") {
                text1.tag.sum = 1 * mekazu[0];
                text1.text = '1の目     (+' + text1.tag.sum+')';
                text1.invalidate();
            }
            if (button2.cssColor === "lime") {
                text2.tag.sum = 2 * mekazu[1];
                text2.text = '2の目     (+' + text2.tag.sum+')';
                text2.invalidate();
            }
            if (button3.cssColor === "lime") {
                text3.tag.sum = 3 * mekazu[2];
                text3.text = '3の目     (+' + text3.tag.sum+')';
                text3.invalidate();
            }
            if (button4.cssColor === "lime") {
                text4.tag.sum = 4 * mekazu[3];
                text4.text = '4の目     (+' + text4.tag.sum+')';
                text4.invalidate();
            }
            if (button5.cssColor === "lime") {
                text5.tag.sum = 5 * mekazu[4];
                text5.text = '5の目     (+' + text5.tag.sum+')';
                text5.invalidate();
            }
            if (button6.cssColor === "lime") {
                text6.tag.sum = 6 * mekazu[5];
                text6.text = '6の目     (+' + text6.tag.sum+')';
                text6.invalidate();
            }
            if (button3c.cssColor === "lime") {
                text3c.tag.sum = 0
                if (Math.max.apply(null, mekazu) >= 3) {//スリーカード
                    for (var i = 0; i < 6; i++) {
                        text3c.tag.sum += (i + 1) * mekazu[i];
                    }
                }
                text3c.text = '3カード (+' + text3c.tag.sum+')';
                text3c.invalidate();
            }
            if (button4c.cssColor === "lime") {
                text4c.tag.sum = 0
                if (Math.max.apply(null, mekazu) >= 4) {//4カード
                    for (var i = 0; i < 6; i++) {
                        text4c.tag.sum += (i + 1) * mekazu[i];
                    }
                }
                text4c.text = '4カード (+' + text4c.tag.sum+')';
                text4c.invalidate();
            }
            if (buttonful.cssColor === "lime") {
                textful.tag.sum = 0
                if (Math.max.apply(null, mekazu) == 3 && (mekazu[0]==2||mekazu[1]==2||mekazu[2]==2||mekazu[3]==2||mekazu[4]==2||mekazu[5]==2)) {//初期
                    for (var i = 0; i < 6; i++) {
                        textful.tag.sum = 25;
                    }
                } else {
                    textful.tag.sum = 0;
                }
                if (buttonyati.cssColor === "gray" && textyati.tag.sum >= 50 && Math.max.apply(null, mekazu) >= 5) {//ジョーカールール
                    if (placeContainer.children[index].children[0].tag.me == 1 && button1.cssColor == "gray") {
                        textful.tag.sum = 25;
                    } else if (placeContainer.children[index].children[0].tag.me == 2 && button2.cssColor == "gray") {
                        textful.tag.sum = 25;
                    } else if (placeContainer.children[index].children[0].tag.me == 3 && button3.cssColor == "gray") {
                        textful.tag.sum = 25;
                    } else if (placeContainer.children[index].children[0].tag.me == 4 && button4.cssColor == "gray") {
                        textful.tag.sum = 25;
                    } else if (placeContainer.children[index].children[0].tag.me == 5 && button5.cssColor == "gray") {
                        textful.tag.sum = 25;
                    } else if (placeContainer.children[index].children[0].tag.me == 6 && button6.cssColor == "gray") {
                        textful.tag.sum = 25;
                    }
                };
                textful.text = 'フルハウス(+' + textful.tag.sum+')';
                textful.invalidate();
            }
            if (buttonsts.cssColor === "lime") {
                textsts.tag.sum = 0
                if (mekazu[2]>=1&&mekazu[3]>=1&&((mekazu[1]>=1&&mekazu[0]>=1)||(mekazu[1]>=1&&mekazu[4]>=1)||(mekazu[4]>=1&&mekazu[5]>=1))) {//初期
                    for (var i = 0; i < 6; i++) {
                        textsts.tag.sum = 30;
                    }
                } else {
                    textsts.tag.sum = 0;
                }
                if (buttonyati.cssColor === "gray" && textyati.tag.sum >= 50 && Math.max.apply(null, mekazu) >= 5) {
                    if (placeContainer.children[index].children[0].tag.me == 1 && button1.cssColor == "gray") {//ジョーカールール
                        textsts.tag.sum = 30;
                    } else if (placeContainer.children[index].children[0].tag.me == 2 && button2.cssColor == "gray") {
                        textsts.tag.sum = 30;
                    } else if (placeContainer.children[index].children[0].tag.me == 3 && button3.cssColor == "gray") {
                        textsts.tag.sum = 30;
                    } else if (placeContainer.children[index].children[0].tag.me == 4 && button4.cssColor == "gray") {
                        textsts.tag.sum = 30;
                    } else if (placeContainer.children[index].children[0].tag.me == 5 && button5.cssColor == "gray") {
                        textsts.tag.sum = 30;
                    } else if (placeContainer.children[index].children[0].tag.me == 6 && button6.cssColor == "gray") {
                        textsts.tag.sum = 30;
                    }
                }
                textsts.text = '小ストレート(+' + textsts.tag.sum+')';
                textsts.invalidate();
            }
            if (buttonstb.cssColor === "lime") {
                textstb.tag.sum = 0
                if (mekazu[1]>=1&&mekazu[2]>=1&&mekazu[3]>=1&&mekazu[4]>=1&&(mekazu[0]>=1||mekazu[5]>=1)) {//初期
                    for (var i = 0; i < 6; i++) {
                        textstb.tag.sum = 40;
                    }
                } else {
                    textstb.tag.sum = 0;
                }
                if (buttonyati.cssColor === "gray" && textyati.tag.sum >= 50 && Math.max.apply(null, mekazu) >= 5) {
                    if (placeContainer.children[index].children[0].tag.me == 1 && button1.cssColor == "gray") {//ジョーカールール
                        textstb.tag.sum = 40;
                    } else if (placeContainer.children[index].children[0].tag.me == 2 && button2.cssColor == "gray") {
                        textstb.tag.sum = 40;
                    } else if (placeContainer.children[index].children[0].tag.me == 3 && button3.cssColor == "gray") {
                        textstb.tag.sum = 40;
                    } else if (placeContainer.children[index].children[0].tag.me == 4 && button4.cssColor == "gray") {
                        textstb.tag.sum = 40;
                    } else if (placeContainer.children[index].children[0].tag.me == 5 && button5.cssColor == "gray") {
                        textstb.tag.sum = 40;
                    } else if (placeContainer.children[index].children[0].tag.me == 6 && button6.cssColor == "gray") {
                        textstb.tag.sum = 40;
                    }
                }
                textstb.text = '大ストレート(+' + textstb.tag.sum+')';
                textstb.invalidate();
            }
            if (buttonyati.cssColor === "lime") {
                textyati.tag.sum = 0
                if (Math.max.apply(null, mekazu) >= 5) {//yati
                    textyati.tag.sum = 50;
                }
                textyati.text = 'ヤッツィー(+' + textyati.tag.sum + ')';
                textyati.invalidate();
            }
            if (buttonch.cssColor === "lime") {
                textch.tag.sum = 0
                for (var i = 0; i < 6; i++) {
                    textch.tag.sum += (i + 1) * mekazu[i];
                }
                textch.text = 'チャンス   (+' + textch.tag.sum+')';
                textch.invalidate();
            }
        }
        var placeContainer = new g.E({//place置き場
            scene: scene,
            x: (g.game.width - 7 * 64) / 2,//7を6に
            y: 10
        });
        scene.append(placeContainer);
        for (var i = 0; i < 5; i++) {//ダイス生成
            var place = createDice(i);
            placeContainer.append(place);
        }
        function diceColor(index){//ダイスの選択による色変化
            placeContainer.children[index].pointDown.add(function() {//サイコロの色
                if(placeContainer.children[index].cssColor === "#fbf"){
                    placeContainer.children[index].cssColor = "#dff";
                }else{
                    placeContainer.children[index].cssColor = "#fbf";
                }
                place.modified();     
            });
        }
        for(let i=0;i<5;i++){
            diceColor(i);
        }
        /*/if(buttonyati.cssColor=== "gray"&&textyati.tag.sum>=50&&Math.max.apply(null, mekazu) >= 5){//ジョーカールール
if(placeContainer.children[index].children[0].tag.me==1&&button1.cssColor == "gray"){
    textful.tag.sum = 25;
    textsts.tag.sum = 30;
    textstb.tag.sum = 40;
}else if(placeContainer.children[index].children[0].tag.me==2&&button2.cssColor == "gray"){
    textful.tag.sum = 25;
    textsts.tag.sum = 30;
    textstb.tag.sum = 40;
}else if(placeContainer.children[index].children[0].tag.me==3&&button3.cssColor == "gray"){
    textful.tag.sum = 25;
    textsts.tag.sum = 30;
    textstb.tag.sum = 40;
}else if(placeContainer.children[index].children[0].tag.me==4&&button4.cssColor == "gray"){
    textful.tag.sum = 25;
    textsts.tag.sum = 30;
    textstb.tag.sum = 40;
}else if(placeContainer.children[index].children[0].tag.me==5&&button5.cssColor == "gray"){
    textful.tag.sum = 25;
    textsts.tag.sum = 30;
    textstb.tag.sum = 40;
}else if(placeContainer.children[index].children[0].tag.me==6&&button6.cssColor == "gray"){
    textful.tag.sum = 25;
    textsts.tag.sum = 30;
    textstb.tag.sum = 40;
}
        }/*/
        function yatikousin(){//ヤッツィーでの点数追加
            if(buttonyati.cssColor=== "gray"&&textyati.tag.sum>=50&&Math.max.apply(null, mekazu) >= 5){
                textyati.tag.sum+=100;
                g.game.vars.gameState.score +=100;
                textyati.text = 'ヤッツィー ' + textyati.tag.sum;
                textyati.invalidate();
            }
            buttonre.cssColor="lime";//振り直しボタンの色変更(後で追加した)
            buttonre.modified();
            textre.text="振り直し(2/2)";
            textre.invalidate();
        }
        var buttonre = new g.FilledRect({//ボタン(振り直し)
            scene: scene,
            cssColor: "lime",
            x: (g.game.width - 32) / 2-16,
            y: 12,
            width: 136,
            height: 32,
            touchable: true,
        });
        var textre = new g.Label({//文字(振り直し)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "振り直し(2/2)",
            x: 8,
            y: -4
        });
        buttonre.append(textre);
        placeContainer.append(buttonre);
        buttonre.pointDown.add(function() {//振り直し
            if (kaisuu < 2) {//あとで直す
                for (var i = 0; i < 5; i++) {
                    if (placeContainer.children[i].cssColor == "#fbf") {
                        deleteDice(i);
                        placeContainer.children[i].cssColor ="#dff";
                        placeContainer.modified();
                    }
                }
                kaisuu++;
                textre.text="振り直し("+(2-kaisuu)+"/2)";
                textre.invalidate();
            }
            if(kaisuu==2){
                buttonre.cssColor="#dff";
            }
        });
        //ここから下ボタン1
        var button1 = new g.FilledRect({//ボタン(1)
            scene: scene,
            cssColor: "lime",
            x: 16,
            y: 70,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text1 = new g.Label({//文字(1)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "1の目",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        text1.tag.sum = 1 * mekazu[0];
        text1.text = '1の目     (+' + text1.tag.sum+")";
        text1.invalidate();
        button1.append(text1);
        scene.append(button1);
        button1.pointDown.add(function() {
            if (button1.cssColor === "lime") {
                button1.cssColor = "gray";
                button1.modified();
                yatikousin();
                g.game.vars.gameState.score +=text1.tag.sum;
                text1.text = '1の目      ' +text1.tag.sum;
                text1.invalidate();
                bonussum+=text1.tag.sum;
                bonusplus(); 
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ここまでボタン1セット(ダイス更新関数の追加も忘れず)
        //ここから下ボタン2
        var button2 = new g.FilledRect({//ボタン(1)
            scene: scene,
            cssColor: "lime",
            x: 16,
            y: 110,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text2 = new g.Label({//文字(1)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "2の目",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        text2.tag.sum = 2 * mekazu[1];
        text2.text = '2の目     (+' + text2.tag.sum+")";
        text2.invalidate();
        button2.append(text2);
        scene.append(button2);
        button2.pointDown.add(function() {
            if (button2.cssColor === "lime") {
                button2.cssColor = "gray";
                button2.modified();
                yatikousin();
                g.game.vars.gameState.score +=text2.tag.sum;
                text2.text = '2の目      ' +text2.tag.sum;
                text2.invalidate();
                bonussum+=text2.tag.sum;
                bonusplus();
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ここまでボタン2セット(ダイス更新関数の追加も忘れず)
        //ここから下ボタン3
        var button3 = new g.FilledRect({//ボタン(1)
            scene: scene,
            cssColor: "lime",
            x: 16,
            y: 150,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text3 = new g.Label({//文字(1)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "3の目",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        text3.tag.sum = 3 * mekazu[2];
        text3.text = '3の目     (+' + text3.tag.sum+")";
        text3.invalidate();
        button3.append(text3);
        scene.append(button3);
        button3.pointDown.add(function() {
            if (button3.cssColor === "lime") {
                button3.cssColor = "gray";
                button3.modified();
                yatikousin();
                g.game.vars.gameState.score +=text3.tag.sum;
                text3.text = '3の目      ' +text3.tag.sum;
                text3.invalidate();
                bonussum+=text3.tag.sum;
                bonusplus();
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ここまでボタン3セット(ダイス更新関数の追加も忘れず)
        //ここから下ボタン4
        var button4 = new g.FilledRect({//ボタン(1)
            scene: scene,
            cssColor: "lime",
            x: 16,
            y: 190,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text4 = new g.Label({//文字(1)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "4の目",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        text4.tag.sum = 4 * mekazu[3];
        text4.text = '4の目     (+' + text4.tag.sum+")";
        text4.invalidate();
        button4.append(text4);
        scene.append(button4);
        button4.pointDown.add(function() {
            if (button4.cssColor === "lime") {
                button4.cssColor = "gray";
                button4.modified();
                yatikousin();
                g.game.vars.gameState.score +=text4.tag.sum;
                text4.text = '4の目      ' +text4.tag.sum;
                text4.invalidate();
                bonussum+=text4.tag.sum;
                bonusplus();
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ここまでボタン4セット(ダイス更新関数の追加も忘れず)
        //ここから下ボタン5
        var button5 = new g.FilledRect({//ボタン(1)
            scene: scene,
            cssColor: "lime",
            x: 16,
            y: 230,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text5 = new g.Label({//文字(1)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "5の目",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        text5.tag.sum = 5 * mekazu[4];
        text5.text = '5の目     (+' + text5.tag.sum+")";
        text5.invalidate();
        button5.append(text5);
        scene.append(button5);
        button5.pointDown.add(function() {
            if (button5.cssColor === "lime") {
                button5.cssColor = "gray";
                button5.modified();
                yatikousin();
                g.game.vars.gameState.score +=text5.tag.sum;
                text5.text = '5の目      ' +text5.tag.sum;
                text5.invalidate();
                bonussum+=text5.tag.sum;
                bonusplus();
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ここまでボタン5セット(ダイス更新関数の追加も忘れず)
        //ここから下ボタン6
        var button6 = new g.FilledRect({//ボタン(6)
            scene: scene,
            cssColor: "lime",
            x: 16,
            y: 270,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text6 = new g.Label({//文字(6)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "6の目",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        text6.tag.sum = 6 * mekazu[5];
        text6.text = '6の目     (+' + text6.tag.sum+")";
        text6.invalidate();
        button6.append(text6);
        scene.append(button6);
        button6.pointDown.add(function() {
            if (button6.cssColor === "lime") {
                button6.cssColor = "gray";
                button6.modified();
                yatikousin();
                g.game.vars.gameState.score +=text6.tag.sum;
                text6.text = '6の目      ' +text6.tag.sum;
                text6.invalidate();
                bonussum+=text6.tag.sum;
                bonusplus();                     
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ここまでボタン6セット(ダイス更新関数の追加も忘れず)
        var textbonus= new g.Label({//文字(bonus)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "ボーナス",
            tag:{sum:0},
            x: 16,
            y: 310
        });
        textbonus.text = 'ボーナス(あと63)';
        textbonus.invalidate();
        scene.append(textbonus);//ここまで文字(bonus)
        function bonusplus() {
            if (((bonussum) >= 63) && textbonus.tag.sum == 0) {
                textbonus.tag.sum = 35;
                g.game.vars.gameState.score += textbonus.tag.sum;
                textbonus.text = 'ボーナス  +' + 35;
                textbonus.invalidate();
            } else if ((bonussum) >= 63) {
                textbonus.text = 'ボーナス  +' + 35;
                textbonus.invalidate();
            }
            else {
                textbonus.text = 'ボーナス(あと' + (63 - bonussum) + ")";
                textbonus.invalidate();
            }
        }
        var button3c = new g.FilledRect({//ボタン(3c)
            scene: scene,
            cssColor: "lime",
            x: -32+((g.game.width) / 2),
            y: 70,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text3c = new g.Label({//文字(3c)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "3カード",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        if (Math.max.apply(null, mekazu) >= 3) {//初期
            for (var i = 0; i < 6; i++) {
                text3c.tag.sum += (i + 1) * mekazu[i];
            }
        } else {
            text3c.tag.sum = 0
        }
        text3c.text = '3カード (+' + text3c.tag.sum+')';
        text3c.invalidate();
        button3c.append(text3c);
        scene.append(button3c);
        button3c.pointDown.add(function() {//ボタン(3c)推したとき
            if (button3c.cssColor === "lime") {
                button3c.cssColor = "gray";
                button3c.modified();
                yatikousin();
                g.game.vars.gameState.score +=text3c.tag.sum;
                text3c.text = '3カード  ' + text3c.tag.sum;
                    text3c.invalidate();
                for(let i=0;i<5;i++){
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ボタン3cおわり
        var button4c = new g.FilledRect({//ボタン(4c)
            scene: scene,
            cssColor: "lime",
            x: -32+((g.game.width) / 2),
            y: 110,
            width: 128,
            height: 32,
            touchable: true,
        });
        var text4c = new g.Label({//文字(4c)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "4カード",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        if (Math.max.apply(null, mekazu) >= 4) {//初期
            for (var i = 0; i < 6; i++) {
                text4c.tag.sum += (i + 1) * mekazu[i];
            }
        } else {
            text4c.tag.sum = 0
        }
        text4c.text = '4カード (+' + text4c.tag.sum+')';
        text4c.invalidate();
        button4c.append(text4c);
        scene.append(button4c);
        button4c.pointDown.add(function() {//ボタン(4c)推したとき
            if (button4c.cssColor === "lime") {
                button4c.cssColor = "gray";
                button4c.modified();
                yatikousin();
                g.game.vars.gameState.score +=text4c.tag.sum;
                text4c.text = '4カード  ' + text4c.tag.sum;
                    text4c.invalidate();
                for(let i=0;i<5;i++){
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ボタン4cおわり
        var buttonful = new g.FilledRect({//ボタン(ful)
            scene: scene,
            cssColor: "lime",
            x: -32+((g.game.width) / 2),
            y: 150,
            width: 168,
            height: 32,
            touchable: true,
        });
        var textful = new g.Label({//文字(ful)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "フルハウス",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        if (Math.max.apply(null, mekazu) == 3&&(mekazu[0]==2||mekazu[1]==2||mekazu[2]==2||mekazu[3]==2||mekazu[4]==2||mekazu[5]==2)) {//初期
            for (var i = 0; i < 6; i++) {
                textful.tag.sum = 25;
            }
        } else {
            textful.tag.sum = 0;
        }
        textful.text = 'フルハウス(+' + textful.tag.sum+')';
        textful.invalidate();
        buttonful.append(textful);
        scene.append(buttonful);
        buttonful.pointDown.add(function() {//ボタン(ful)推したとき
            if (buttonful.cssColor === "lime") {
                buttonful.cssColor = "gray";
                buttonful.modified();
                yatikousin();
                g.game.vars.gameState.score +=textful.tag.sum;
                textful.text = 'フルハウス ' + textful.tag.sum;
                    textful.invalidate();
                for(let i=0;i<5;i++){
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ボタンfulおわり
        var buttonsts = new g.FilledRect({//ボタン(sts)
            scene: scene,
            cssColor: "lime",
            x: -32+((g.game.width) / 2),
            y: 190,
            width: 200,
            height: 32,
            touchable: true,
        });
        var textsts = new g.Label({//文字(sts)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "小ストレート",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        if (mekazu[2]>=1&&mekazu[3]>=1&&((mekazu[1]>=1&&mekazu[0]>=1)||(mekazu[1]>=1&&mekazu[4]>=1)||(mekazu[4]>=1&&mekazu[5]>=1))) {//初期
            for (var i = 0; i < 6; i++) {
                textsts.tag.sum = 30;
            }
        } else {
            textsts.tag.sum = 0;
        }
        textsts.text = '小ストレート(+' + textsts.tag.sum+')';
        textsts.invalidate();
        buttonsts.append(textsts);
        scene.append(buttonsts);
        buttonsts.pointDown.add(function() {//ボタン(sts)推したとき
            if (buttonsts.cssColor === "lime") {
                buttonsts.cssColor = "gray";
                buttonsts.modified();
                yatikousin();
                g.game.vars.gameState.score +=textsts.tag.sum;
                textsts.text = '小ストレート ' + textsts.tag.sum;
                    textsts.invalidate();
                for(let i=0;i<5;i++){
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ボタンstsおわり
        var buttonstb = new g.FilledRect({//ボタン(stb)
            scene: scene,
            cssColor: "lime",
            x: -32+((g.game.width) / 2),
            y: 230,
            width: 200,
            height: 32,
            touchable: true,
        });
        var textstb = new g.Label({//文字(sts)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "大ストレート",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        if (mekazu[1]>=1&&mekazu[2]>=1&&mekazu[3]>=1&&mekazu[4]>=1&&(mekazu[0]>=1||mekazu[5]>=1)) {//初期
            for (var i = 0; i < 6; i++) {
                textstb.tag.sum = 40;
            }
        } else {
            textstb.tag.sum = 0;
        }
        textstb.text = '大ストレート(+' + textstb.tag.sum+')';
        textstb.invalidate();
        buttonstb.append(textstb);
        scene.append(buttonstb);
        buttonstb.pointDown.add(function() {//ボタン(sts)推したとき
            if (buttonstb.cssColor === "lime") {
                buttonstb.cssColor = "gray";
                buttonstb.modified();
                yatikousin();
                g.game.vars.gameState.score +=textstb.tag.sum;
                textstb.text = '大ストレート ' + textstb.tag.sum;
                    textstb.invalidate();
                for(let i=0;i<5;i++){
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ボタンstbおわり
        var buttonyati = new g.FilledRect({//ボタン(ヤッツィー)
            scene: scene,
            cssColor: "lime",
            x: -32+((g.game.width) / 2),
            y: 270,
            width: 168,
            height: 32,
            touchable: true,
        });
        var textyati = new g.Label({//文字(yati)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "ヤッツィー",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        if (Math.max.apply(null, mekazu) >= 5) {//初期
            textyati.tag.sum = 50;
        } else {
            textyati.tag.sum = 0
        }
        textyati.text = 'ヤッツィー(+' + textyati.tag.sum+')';
        textyati.invalidate();
        buttonyati.append(textyati);
        scene.append(buttonyati);
        buttonyati.pointDown.add(function () {//ボタン(yati)推したとき
            if (buttonyati.cssColor === "lime") {
                buttonyati.cssColor = "gray";
                buttonyati.modified();
                g.game.vars.gameState.score += textyati.tag.sum;
                textyati.text = 'ヤッツィー ' + textyati.tag.sum;
                textyati.invalidate();
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
                kaisuu = 0;
                turn++;
                buttonre.cssColor = "lime";//ヤッツィーの時だけ追加
                buttonre.modified();
                textre.text = "振り直し(2/2)";
                textre.invalidate();
            }
        });//ボタンyatiおわり
        var buttonch = new g.FilledRect({//ボタン(ch)
            scene: scene,
            cssColor: "lime",
            x: -32+((g.game.width) / 2),
            y: 310,
            width: 144,
            height: 32,
            touchable: true,
        });
        var textch = new g.Label({//文字(ch)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "チャンス",
            tag:{sum:0},
            x: 8,
            y: -4
        });
        for (var i = 0; i < 6; i++) {
            textch.tag.sum += (i + 1) * mekazu[i];
        }
        textch.text = 'チャンス  (+' + textch.tag.sum+')';
        textch.invalidate();
        buttonch.append(textch);
        scene.append(buttonch);
        buttonch.pointDown.add(function() {//ボタン(3c)推したとき
            if (buttonch.cssColor === "lime") {
                buttonch.cssColor = "gray";
                buttonch.modified();
                yatikousin();
                g.game.vars.gameState.score +=textch.tag.sum;
                textch.text = 'チャンス  ' + textch.tag.sum;
                    textch.invalidate();
                for(let i=0;i<5;i++){
                    deleteDice(i);
                }
                kaisuu=0;
                turn++;
            }
        });//ボタンchおわり
        if (param.isAtsumaru) {
            var buttonretry = new g.FilledRect({//ボタン(retry)
                scene: scene,
                cssColor: "red",
                x: -96 + ((g.game.width)),
                y: 320,
                width: 96,
                height: 32,
                touchable: true,
            });
            var textretry = new g.Label({//文字(retry)
                scene: scene,
                font: font,
                fontSize: 32,
                text: "Retry",
                tag: { sum: 0 },
                x: 8,
                y: -6,
            });
            buttonretry.append(textretry);
            scene.append(buttonretry);
            buttonretry.pointDown.add(function () {//ボタン(retry)推したとき
                time = 180;
                kaisuu = 0;
                turn = 0;
                bonussum = 0;
                g.game.vars.gameState.score = 0;
                buttonre.cssColor = "lime";//振り直しボタンの色変更
                buttonre.modified();
                textre.text = "振り直し(2/2)";
                textre.invalidate();
                text1.tag.sum = 0;
                text1.text = '1の目     (+' + text1.tag.sum + ")";
                text1.invalidate();
                button1.cssColor = "lime"
                button1.modified();
                text2.tag.sum = 0;
                text2.text = '2の目     (+' + text2.tag.sum + ")";
                text2.invalidate();
                button2.cssColor = "lime"
                button2.modified();
                text3.tag.sum = 0;
                text3.text = '3の目     (+' + text3.tag.sum + ")";
                text3.invalidate();
                button3.cssColor = "lime"
                button3.modified();
                text4.tag.sum = 0;
                text4.text = '4の目     (+' + text4.tag.sum + ")";
                text4.invalidate();
                button4.cssColor = "lime"
                button4.modified();
                text5.tag.sum = 0;
                text5.text = '5の目     (+' + text4.tag.sum + ")";
                text5.invalidate();
                button5.cssColor = "lime"
                button5.modified();
                text6.tag.sum = 0;
                text6.text = '6の目     (+' + text4.tag.sum + ")";
                text6.invalidate();
                button6.cssColor = "lime"
                button6.modified();
                textbonus.tag.sum = 0;
                textbonus.text = 'ボーナス(あと63)';
                textbonus.invalidate();
                text3c.tag.sum = 0;
                text3c.text = '3カード  (+' + text3c.tag.sum + ')';
                text3c.invalidate();
                button3c.cssColor = "lime"
                button3c.modified();
                text4c.tag.sum = 0;
                text4c.text = '4カード  (+' + text4c.tag.sum + ')';
                text4c.invalidate();
                button4c.cssColor = "lime"
                button4c.modified();
                textful.tag.sum = 0;
                textful.text = 'フルハウス(+' + textful.tag.sum + ')';
                textful.invalidate();
                buttonful.cssColor = "lime"
                buttonful.modified();
                textsts.tag.sum = 0;
                textsts.text = '小ストレート(+' + textsts.tag.sum + ')';
                textsts.invalidate();
                buttonsts.cssColor = "lime"
                buttonsts.modified();
                textstb.tag.sum = 0;
                textstb.text = '大ストレート(+' + textstb.tag.sum + ')';
                textstb.invalidate();
                buttonstb.cssColor = "lime"
                buttonstb.modified();
                textyati.tag.sum = 0;
                textyati.text = 'ヤッツィー(+' + textyati.tag.sum + ')';
                textyati.invalidate();
                buttonyati.cssColor = "lime"
                buttonyati.modified();
                textch.tag.sum = 0;
                textch.text = 'チャンス  (+' + textch.tag.sum + ')';
                textch.invalidate();
                buttonch.cssColor = "lime"
                buttonch.modified();
                for (let i = 0; i < 5; i++) {
                    deleteDice(i);
                }
            });//ボタンchおわり
        }
        // スコア表示用のラベル
        var scoreLabel = new g.Label({
            scene: scene,
            text: "SCORE: 0",
            font: font,
            fontSize: font.size / 2,
            textColor: "black",
            x: 0.79 * g.game.width,
            y: 104
        });
        scene.append(scoreLabel);
        // 残り時間表示用ラベル
        var timeLabel = new g.Label({
            scene: scene,
            text: "TIME: 0",
            font: font,
            fontSize: font.size / 2,
            textColor: "black",
            x: 0.79 * g.game.width,
            y:72
        });
        scene.append(timeLabel);
        scene.pointDownCapture.add(function () {// 制限時間以内であればタッチ1回ごとにスコア更新
            if (time > 0) {
                scoreLabel.text = "SCORE: " + g.game.vars.gameState.score;
                scoreLabel.invalidate();
            }
        });
        var buttonrule = new g.FilledRect({//ボタン(ルール)
            scene: scene,
            cssColor: "red",
            x: -80 + ((g.game.width)),
            y: 260,
            width: 96,
            height: 32,
            touchable: true,
        });
        var textrule = new g.Label({//文字(ルール)
            scene: scene,
            font: font,
            fontSize: 32,
            text: "説明",
            tag: { sum: 0 },
            x: 8,
            y: -4,
        });
        buttonrule.append(textrule);
        var rule = new g.Sprite({//ルール画像
            scene: scene,
            src: scene.assets["rule"],
            opacity:0,
        });
        scene.append(rule);
        scene.append(buttonrule);
        buttonrule.pointDown.add(function () {//推してる間表示
            rule.opacity = 1;
        });
        buttonrule.pointUp.add(function () {
            rule.opacity = 0;
        });
        var updateHandler = function () {
            if(turn==13&&param.isAtsumaru&&time>0){
                time=0;
            }
            if (time <= 0&&time>=-(1 / g.game.fps)) {
                // RPGアツマール環境であればランキングを表示します
                if (param.isAtsumaru) {
                    var boardId_1 = 1;
                    window.RPGAtsumaru.experimental.scoreboards.setRecord(boardId_1, g.game.vars.gameState.score).then(function () {
                        window.RPGAtsumaru.experimental.scoreboards.display(boardId_1);
                    });
                }
                //scene.update.remove(updateHandler); // カウントダウンを止めるためにこのイベントハンドラを削除します
            }
            // カウントダウン処理
            time -= 1 / g.game.fps;
            if(time>-1){
                timeLabel.text = "TIME: " + Math.ceil(time);
            timeLabel.invalidate();
            }      
        };
        scene.update.add(updateHandler);
        // ここまでゲーム内容を記述します
    });
    g.game.pushScene(scene);
}
exports.main = main;
