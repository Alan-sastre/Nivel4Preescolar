class Nivel4Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Nivel4Scene" });
    this.puzzleActual = 0;
    this.bgElements = [];
    this.puzzleContainer = null;
    this.robot = null;
  }

  preload() {
    this.load.setBaseURL("");
    this.load.audio("bgMusic", "musica (1).mp3");
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    this.input.setDefaultCursor("pointer");
    if (this.physics && this.physics.world) {
      this.physics.world.gravity.y = 500;
      this.physics.world.setBounds(0, 0, w, h, true, true, true, true);
    }
    this.crearFondo(w, h);
    this.audioManager = new AudioManager(this, "bgMusic", {
      x: 20,
      y: 30,
    });
    this.crearRobot(w, h);
    this.mostrarPuzzle(this.puzzleActual);
  }

  crearFondo(w, h) {
    const fondo = this.add.graphics();
    fondo.fillGradientStyle(0x93c5fd, 0x93c5fd, 0x60a5fa, 0x60a5fa, 1);
    fondo.fillRect(0, 0, w, h);
    this.bgElements.push(fondo);

    const sol = this.add.graphics();
    sol.fillStyle(0xfcd34d, 1);
    sol.fillCircle(w - 80, 80, 40);
    sol.lineStyle(4, 0xf59e0b, 1);
    sol.strokeCircle(w - 80, 80, 40);
    this.tweens.add({
      targets: sol,
      alpha: { from: 0.9, to: 1 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    this.bgElements.push(sol);

    for (let i = 0; i < 4; i++) {
      const nube = this.add.graphics();
      const x = 120 + i * 220;
      const y = 80 + (i % 2) * 25;
      nube.fillStyle(0xffffff, 0.95);
      nube.fillRoundedRect(x - 50, y - 20, 100, 40, 20);
      nube.fillCircle(x - 60, y, 18);
      nube.fillCircle(x + 60, y, 18);
      nube.alpha = 0.8;
      this.tweens.add({
        targets: nube,
        x: x + 10,
        duration: 2000,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
      this.bgElements.push(nube);
    }

    const suelo = this.add.graphics();
    suelo.fillStyle(0xa7f3d0, 1);
    suelo.fillRect(0, h - 90, w, 90);
    suelo.lineStyle(4, 0x10b981, 1);
    suelo.strokeRect(0, h - 90, w, 90);
    this.bgElements.push(suelo);

    for (let i = 0; i < 12; i++) {
      const tornillo = this.add.graphics();
      const tx = 40 + i * 80;
      tornillo.fillStyle(0x9ca3af, 1);
      tornillo.fillCircle(tx, h - 20, 6);
      tornillo.lineStyle(2, 0x4b5563, 1);
      tornillo.strokeCircle(tx, h - 20, 6);
      this.bgElements.push(tornillo);
    }
  }

  crearRobot(w, h) {
    const container = this.add.container(80, h - 140);
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1);
    g.fillRoundedRect(-35, -50, 70, 100, 16);
    g.lineStyle(3, 0x64748b, 1);
    g.strokeRoundedRect(-35, -50, 70, 100, 16);

    g.fillStyle(0x93c5fd, 1);
    g.fillRoundedRect(-30, -45, 60, 55, 12);
    g.fillStyle(0xffffff, 1);
    g.fillCircle(-15, -25, 8);
    g.fillCircle(15, -25, 8);
    g.fillStyle(0x1f2937, 1);
    g.fillCircle(-15, -25, 4);
    g.fillCircle(15, -25, 4);
    g.lineStyle(3, 0xf59e0b, 1);
    g.beginPath();
    g.arc(0, -6, 14, 0.15 * Math.PI, 0.85 * Math.PI);
    g.strokePath();

    g.fillStyle(0x60a5fa, 1);
    g.fillRoundedRect(-22, 18, 44, 18, 6);
    g.lineStyle(2, 0x2563eb, 1);
    g.strokeRoundedRect(-22, 18, 44, 18, 6);

    const antena = this.add.graphics();
    antena.lineStyle(3, 0x64748b, 1);
    antena.beginPath();
    antena.moveTo(0, -50);
    antena.lineTo(0, -68);
    antena.strokePath();
    antena.fillStyle(0xf59e0b, 1);
    antena.fillCircle(0, -72, 6);
    container.add([g, antena]);

    this.tweens.add({
      targets: container,
      y: container.y - 6,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    container.setDepth(1000);
    this.robot = container;
  }

  limpiarPuzzle() {
    if (this.puzzleContainer) {
      this.puzzleContainer.destroy(true);
      this.puzzleContainer = null;
    }
    if (this.cajaVis) {
      this.cajaVis.destroy();
      this.cajaVis = null;
    }
    if (this.dirArrows) {
      this.dirArrows.forEach((a) => a && a.destroy());
      this.dirArrows = null;
    }
  }

  mostrarPuzzle(index) {
    this.limpiarPuzzle();
    const w = this.scale.width;
    const h = this.scale.height;
    const cont = this.add.container(w / 2, h / 2);
    this.puzzleContainer = cont;

    const sombra = this.add.graphics();
    sombra.fillStyle(0x000000, 0.18);
    sombra.fillRoundedRect(-420, -170, 840, 340, 28);
    sombra.x = 6;
    sombra.y = 6;

    const panel = this.add.graphics();
    panel.fillStyle(0xfffbeb, 1);
    panel.fillRoundedRect(-420, -170, 840, 340, 28);
    panel.lineStyle(6, 0xf59e0b, 1);
    panel.strokeRoundedRect(-420, -170, 840, 340, 28);

    cont.add([sombra, panel]);

    const puntos = this.add.graphics();
    puntos.fillStyle(0xd1d5db, 1);
    for (let i = 0; i < 3; i++) {
      const r = i === index ? 9 : 6;
      const color = i === index ? 0xf59e0b : 0xd1d5db;
      puntos.fillStyle(color, 1);
      puntos.fillCircle(-30 + i * 30, 150, r);
    }
    cont.add(puntos);

    if (index === 0) {
      this.palancaPuzzle(cont);
    } else if (index === 1) {
      this.ruedaPuzzle(cont);
    } else {
      this.engrasePuzzle(cont);
    }

    cont.alpha = 0;
    this.tweens.add({ targets: cont, alpha: 1, duration: 350 });
  }

  palancaPuzzle(cont) {
    const gBase = this.add.graphics();
    gBase.fillStyle(0x8b5cf6, 0.15);
    gBase.fillRoundedRect(-380, -140, 760, 280, 22);
    cont.add(gBase);

    const fulcro = this.add.graphics();
    fulcro.fillStyle(0x8b4513, 1);
    fulcro.beginPath();
    fulcro.moveTo(0, 40);
    fulcro.lineTo(-35, 80);
    fulcro.lineTo(35, 80);
    fulcro.closePath();
    fulcro.fillPath();
    cont.add(fulcro);

    const lever = this.add.container(0, 20);
    const barra = this.add.graphics();
    barra.fillStyle(0x3b82f6, 1);
    barra.fillRoundedRect(-240, -12, 480, 24, 12);
    const brillo = this.add.graphics();
    brillo.fillStyle(0xffffff, 0.25);
    brillo.fillRoundedRect(-235, -9, 470, 10, 10);
    lever.add([barra, brillo]);

    const pomoIzq = this.add.graphics();
    pomoIzq.fillStyle(0xef4444, 1);
    pomoIzq.fillCircle(-230, 0, 22);
    pomoIzq.lineStyle(3, 0xb91c1c, 1);
    pomoIzq.strokeCircle(-230, 0, 22);
    lever.add(pomoIzq);

    const pesoDer = this.add.graphics();
    pesoDer.fillStyle(0x10b981, 1);
    pesoDer.fillRoundedRect(190, -16, 50, 32, 8);
    pesoDer.lineStyle(3, 0x047857, 1);
    pesoDer.strokeRoundedRect(190, -16, 50, 32, 8);
    lever.add(pesoDer);

    const cajaVis = this.add.graphics();
    cajaVis.lineStyle(4, 0xf59e0b, 1);
    cajaVis.fillStyle(0xfde68a, 1);
    cajaVis.fillRoundedRect(-30, -30, 60, 60, 12);
    cajaVis.strokeRoundedRect(-30, -30, 60, 60, 12);
    cajaVis.x = cont.x + 220;
    cajaVis.y = cont.y - 30;
    cajaVis.setDepth(900);
    this.cajaVis = cajaVis;

    const goal = this.add.graphics();
    goal.fillStyle(0xe5e7eb, 1);
    goal.fillRoundedRect(210, -120, 80, 30, 10);
    goal.lineStyle(3, 0x93c5fd, 1);
    goal.strokeRoundedRect(210, -120, 80, 30, 10);
    cont.add(goal);

    const estrella = this.add.graphics();
    const cx = 250;
    const cy = -105;
    const points = 5;
    const outer = 12;
    const inner = 6;
    estrella.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const rad = (Math.PI * i) / points;
      const r = i % 2 === 0 ? outer : inner;
      const px = cx + Math.cos(rad - Math.PI / 2) * r;
      const py = cy + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrella.moveTo(px, py);
      else estrella.lineTo(px, py);
    }
    estrella.closePath();
    estrella.strokePath();
    estrella.fillStyle(0xf59e0b, 1);
    estrella.fillPath();
    cont.add(estrella);
    const goalX = cont.x + 250;
    const goalY = cont.y - 105;

    cont.add(lever);

    const plataforma = this.add.graphics();
    plataforma.fillStyle(0x10b981, 0);
    plataforma.fillRoundedRect(160, 30, 120, 18, 6);
    plataforma.setDepth(8);

    const glow = this.add.graphics();
    glow.lineStyle(4, 0xf59e0b, 0.4);
    glow.strokeRoundedRect(-380, -140, 760, 280, 22);
    this.tweens.add({
      targets: glow,
      alpha: { from: 0.1, to: 0.5 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    cont.add(glow);

    const zona = new Phaser.Geom.Circle(-230, 0, 34);
    lever.setInteractive(zona, Phaser.Geom.Circle.Contains);

    let enPaso = false;
    let completado = false;
    const rotFinal = -0.72;
    const pasos = 5;
    const rotPaso = rotFinal / pasos;
    const actualizarCaja = () => {
      const rot = lever.rotation;
      const lx = 220;
      const ly = -18;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      cajaVis.x = cont.x + lever.x + (lx * cos - ly * sin);
      cajaVis.y = cont.y + lever.y + (lx * sin + ly * cos);
    };
    lever.on("pointerdown", () => {
      if (enPaso || completado) return;
      enPaso = true;
      this.tweens.add({
        targets: barra,
        scaleX: 1.02,
        duration: 120,
        yoyo: true,
      });
      this.tweens.add({
        targets: lever,
        rotation: lever.rotation + rotPaso,
        duration: 260,
        ease: "Sine.easeInOut",
        onUpdate: actualizarCaja,
        onComplete: () => {
          enPaso = false;
          if (lever.rotation <= rotFinal + 0.02 && !completado) {
            completado = true;
            this.tweens.add({
              targets: cajaVis,
              x: goalX,
              y: goalY,
              duration: 500,
              ease: "Sine.easeInOut",
              onComplete: () => {
                this.reaccionRobot();
                this.estallidoConfeti(goalX, goalY);
                this.avanzarPuzzle();
              },
            });
          }
        },
      });
    });

    const ring = this.crearAnilloPulsante(-230, 0, 22, 0xef4444);
    const flecha = this.crearFlechaHint(-230, -40, 0, 0xef4444);
    const manoPalanca = this.add.text(-230, 44, "👆", {
      fontFamily: "Arial",
      fontSize: "40px",
      color: "#ffffff",
    });
    manoPalanca.setOrigin(0.5);
    lever.add([ring, flecha, manoPalanca]);
    this.tweens.add({
      targets: manoPalanca,
      y: { from: manoPalanca.y, to: manoPalanca.y + 6 },
      scaleX: { from: 1, to: 1.08 },
      scaleY: { from: 1, to: 0.9 },
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  rampaPuzzle(cont) {
    const gBase = this.add.graphics();
    gBase.fillStyle(0x60a5fa, 0.15);
    gBase.fillRoundedRect(-380, -140, 760, 280, 22);
    cont.add(gBase);

    const plataforma = this.add.graphics();
    plataforma.fillStyle(0x4b5563, 1);
    plataforma.fillRect(-270, 70, 540, 10);
    cont.add(plataforma);

    const rampa = this.add.graphics();
    const knob = this.add.graphics();
    const objetivo = this.add.graphics();
    const bola = this.add.graphics();
    const knobHalo = this.add.graphics();
    knobHalo.lineStyle(3, 0x3b82f6, 1);
    knobHalo.strokeCircle(0, 0, 20);
    knobHalo.x = cont.x - 220;
    knobHalo.y = cont.y + 40;
    this.tweens.add({
      targets: knobHalo,
      scaleX: { from: 1, to: 1.15 },
      scaleY: { from: 1, to: 1.15 },
      alpha: { from: 1, to: 0.6 },
      duration: 900,
      yoyo: true,
      repeat: -1,
    });
    const arrowBall = this.crearFlechaHint(
      cont.x - 220,
      cont.y + 32,
      -0.35,
      0x10b981,
    );
    let flowArrows = [];

    let angulo = -0.35;
    const dibujarRampa = () => {
      rampa.clear();
      rampa.lineStyle(6, 0x3b82f6, 1);
      rampa.fillStyle(0x93c5fd, 0.25);
      const x1 = -220,
        y1 = 40;
      const largo = 320;
      const x2 = x1 + Math.cos(angulo) * largo;
      const y2 = y1 + Math.sin(angulo) * largo;
      rampa.beginPath();
      rampa.moveTo(x1, y1);
      rampa.lineTo(x2, y2);
      rampa.strokePath();
      rampa.beginPath();
      rampa.moveTo(x1, y1);
      rampa.lineTo(x2, y2);
      rampa.lineTo(x2, y2 + 18);
      rampa.lineTo(x1, y1 + 18);
      rampa.closePath();
      rampa.fillPath();

      knob.clear();
      knob.fillStyle(0xfca5a5, 1);
      knob.fillCircle(x1, y1, 16);
      knob.lineStyle(3, 0xef4444, 1);
      knob.strokeCircle(x1, y1, 16);

      objetivo.clear();
      objetivo.lineStyle(3, 0x92400e, 1);
      objetivo.beginPath();
      const cx = x2 + 15,
        cy = y2 - 15;
      const points = 5;
      const outer = 18;
      const inner = 8;
      for (let i = 0; i < points * 2; i++) {
        const rad = (Math.PI * i) / points;
        const r = i % 2 === 0 ? outer : inner;
        const px = cx + Math.cos(rad - Math.PI / 2) * r;
        const py = cy + Math.sin(rad - Math.PI / 2) * r;
        if (i === 0) objetivo.moveTo(px, py);
        else objetivo.lineTo(px, py);
      }
      objetivo.closePath();
      objetivo.strokePath();
      objetivo.fillStyle(0xf59e0b, 1);
      objetivo.fillPath();
      arrowBall.x = cont.x + x1;
      arrowBall.y = cont.y + y1 - 10;
      arrowBall.rotation = angulo;
      flowArrows.forEach((a) => a.destroy());
      flowArrows = [];
      for (let i = 1; i <= 5; i++) {
        const t = i / 6;
        const px = x1 + Math.cos(angulo) * largo * t;
        const py = y1 + Math.sin(angulo) * largo * t;
        const fa = this.add.graphics();
        fa.fillStyle(0x3b82f6, 1);
        fa.beginPath();
        fa.moveTo(0, -6);
        fa.lineTo(-8, 6);
        fa.lineTo(8, 6);
        fa.closePath();
        fa.fillPath();
        fa.x = cont.x + px;
        fa.y = cont.y + py;
        fa.rotation = angulo;
        this.tweens.add({
          targets: fa,
          alpha: { from: 1, to: 0.3 },
          y: fa.y + 4,
          duration: 800,
          yoyo: true,
          repeat: -1,
        });
        cont.add(fa);
        flowArrows.push(fa);
      }
    };

    dibujarRampa();
    cont.add([rampa, knob, objetivo]);

    bola.fillStyle(0x10b981, 1);
    bola.fillCircle(-220, 40 - 10, 12);
    bola.lineStyle(3, 0x047857, 1);
    bola.strokeCircle(-220, 40 - 10, 12);
    cont.add(bola);

    const manoKnob = this.add
      .text(-260, 8, "👆", {
        fontFamily: "Arial",
        fontSize: "38px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    cont.add(manoKnob);
    this.tweens.add({
      targets: manoKnob,
      y: { from: manoKnob.y, to: manoKnob.y + 7 },
      scaleX: { from: 1, to: 1.06 },
      scaleY: { from: 1, to: 0.92 },
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    const manoBola = this.add
      .text(-180, 10, "👆", {
        fontFamily: "Arial",
        fontSize: "38px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    cont.add(manoBola);
    this.tweens.add({
      targets: manoBola,
      y: { from: manoBola.y, to: manoBola.y + 7 },
      scaleX: { from: 1, to: 1.06 },
      scaleY: { from: 1, to: 0.92 },
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    knob.setInteractive(
      new Phaser.Geom.Circle(-220, 40, 18),
      Phaser.Geom.Circle.Contains,
    );
    let arr = false;
    knob.on("pointerdown", () => {
      arr = true;
    });
    knob.on("pointerup", () => {
      arr = false;
    });
    knob.on("pointerout", () => {
      arr = false;
    });
    knob.on("pointermove", (p) => {
      if (!arr) return;
      const lp = cont.getLocalPoint(p.x, p.y);
      const dx = lp.x + 220;
      angulo = Phaser.Math.Clamp(-0.7 + dx / 700, -0.7, -0.15);
      dibujarRampa();
    });

    bola.setInteractive(
      new Phaser.Geom.Circle(-220, 40 - 10, 14),
      Phaser.Geom.Circle.Contains,
    );
    bola.on("pointerover", () => {
      this.tweens.add({
        targets: bola,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 150,
        yoyo: true,
      });
    });
    bola.on("pointerdown", () => {
      const correcto = angulo > -0.5 && angulo < -0.25;
      if (!correcto) {
        this.tweens.add({
          targets: bola,
          x: bola.x - 8,
          duration: 100,
          yoyo: true,
          repeat: 2,
        });
        return;
      }
      const largo = 320;
      const x2 = -220 + Math.cos(angulo) * largo;
      const y2 = 40 + Math.sin(angulo) * largo;
      this.tweens.add({
        targets: bola,
        x: x2 - 5,
        y: y2 - 14,
        rotation: Math.PI * 2,
        duration: 1200,
        ease: "Sine.easeInOut",
        onComplete: () => {
          this.reaccionRobot();
          this.estallidoConfeti(cont.x + x2, cont.y + y2 - 30);
          this.avanzarPuzzle();
        },
      });
    });

    const ringKnob = this.crearFlechaHint(
      cont.x - 300,
      cont.y + 40,
      Math.PI / 2,
      0x3b82f6,
    );
  }

  ruedaPuzzle(cont) {
    const gBase = this.add.graphics();
    gBase.fillStyle(0x60a5fa, 0.15);
    gBase.fillRoundedRect(-380, -140, 760, 280, 22);
    cont.add(gBase);

    const belt = this.add.graphics();
    belt.fillStyle(0x9ca3af, 1);
    belt.fillRoundedRect(-260, 34, 520, 22, 10);
    belt.fillStyle(0x6b7280, 1);
    for (let i = 0; i < 13; i++) {
      belt.fillRoundedRect(-248 + i * 40, 36, 16, 18, 4);
    }
    cont.add(belt);

    const wheel = this.add.container(-260, 80);
    const wg = this.add.graphics();
    wg.fillStyle(0xffffff, 1);
    wg.fillCircle(0, 0, 36);
    wg.lineStyle(4, 0x3b82f6, 1);
    wg.strokeCircle(0, 0, 36);
    wg.fillStyle(0xe5f0ff, 1);
    wg.fillCircle(0, 0, 24);
    wg.lineStyle(2, 0x93c5fd, 1);
    wg.strokeCircle(0, 0, 24);
    for (let i = 0; i < 6; i++) {
      const ang = (i / 6) * Math.PI * 2;
      const x = Math.cos(ang) * 26;
      const y = Math.sin(ang) * 26;
      wg.fillStyle(0x3b82f6, 1);
      wg.fillRoundedRect(x - 6, y - 3, 12, 6, 2);
    }
    const handle = this.add.graphics();
    handle.fillStyle(0xef4444, 1);
    handle.fillCircle(36, 0, 12);
    handle.lineStyle(3, 0xb91c1c, 1);
    handle.strokeCircle(36, 0, 12);
    const handleInner = this.add.graphics();
    handleInner.fillStyle(0xfca5a5, 1);
    handleInner.fillCircle(36, -2, 8);
    handleInner.fillStyle(0xffffff, 0.35);
    handleInner.fillCircle(32, -4, 3);
    const manoRueda = this.add.text(36, 28, "👆", {
      fontFamily: "Arial",
      fontSize: "38px",
      color: "#ffffff",
    });
    manoRueda.setOrigin(0.5);
    wheel.add([wg, handle, handleInner, manoRueda]);
    this.tweens.add({
      targets: manoRueda,
      y: { from: manoRueda.y, to: manoRueda.y + 6 },
      scaleX: { from: 1, to: 1.08 },
      scaleY: { from: 1, to: 0.9 },
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
    cont.add(wheel);

    const goal = this.add.graphics();
    goal.fillStyle(0xe5e7eb, 1);
    goal.fillRoundedRect(220, -30, 80, 30, 10);
    goal.lineStyle(3, 0x93c5fd, 1);
    goal.strokeRoundedRect(220, -30, 80, 30, 10);
    cont.add(goal);

    const estrella = this.add.graphics();
    const sx = 260;
    const sy = -15;
    const outer = 10;
    const inner = 5;
    estrella.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (Math.PI * i) / 5;
      const r = i % 2 === 0 ? outer : inner;
      const px = sx + Math.cos(rad - Math.PI / 2) * r;
      const py = sy + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrella.moveTo(px, py);
      else estrella.lineTo(px, py);
    }
    estrella.closePath();
    estrella.lineStyle(3, 0xf59e0b, 1);
    estrella.strokePath();
    estrella.fillStyle(0xf59e0b, 1);
    estrella.fillPath();
    cont.add(estrella);

    const cart = this.add.container(-260, 40);
    const cartBody = this.add.graphics();
    cartBody.fillStyle(0x10b981, 1);
    cartBody.fillRoundedRect(-32, -12, 56, 24, 8);
    cartBody.lineStyle(3, 0x047857, 1);
    cartBody.strokeRoundedRect(-32, -12, 56, 24, 8);
    const cabina = this.add.graphics();
    cabina.fillStyle(0x059669, 1);
    cabina.fillRoundedRect(-24, -18, 28, 16, 6);
    const ventana = this.add.graphics();
    ventana.fillStyle(0xbfdbfe, 1);
    ventana.fillRoundedRect(-20, -16, 16, 10, 4);
    const ruedas = this.add.graphics();
    ruedas.fillStyle(0x111827, 1);
    ruedas.fillCircle(-18, 14, 7);
    ruedas.fillCircle(4, 14, 7);
    ruedas.fillStyle(0x6b7280, 1);
    ruedas.fillCircle(-18, 14, 3);
    ruedas.fillCircle(4, 14, 3);
    const sombra = this.add.graphics();
    sombra.fillStyle(0x000000, 0.18);
    sombra.fillEllipse(0, 18, 46, 6);
    sombra.y += 2;
    cart.add([sombra, cartBody, cabina, ventana, ruedas]);
    cont.add(cart);

    const ring = this.crearAnilloPulsante(36, 0, 22, 0xef4444);
    const rotArrow = this.crearFlechaCurvaHint(
      cont.x - 310,
      cont.y + 80,
      0xef4444,
    );
    const dirArrow = this.crearFlechaHint(
      cont.x - 120,
      cont.y + 50,
      Math.PI / 2,
      0x4b5563,
    );
    const dirArrow2 = this.crearFlechaHint(
      cont.x + 20,
      cont.y + 50,
      Math.PI / 2,
      0x4b5563,
    );
    this.dirArrows = [dirArrow, dirArrow2, ring];
    wheel.add(ring);

    wheel.setSize(80, 80);
    wheel.setInteractive(
      new Phaser.Geom.Circle(0, 0, 40),
      Phaser.Geom.Circle.Contains,
    );
    let drag = false;
    let prevAng = 0;
    let prog = 0;
    let completado = false;
    wheel.on("pointerdown", () => {});
    wheel.on("pointerup", () => {
      drag = false;
    });
    wheel.on("pointerout", () => {
      drag = false;
    });
    wheel.on("pointermove", (p) => {
      if (!drag) return;
      const lp = wheel.getLocalPoint(p.x, p.y);
      const ang = Math.atan2(lp.y, lp.x);
      let diff = ang - prevAng;
      diff = Phaser.Math.Angle.Wrap(diff);
      wheel.rotation += diff;
      prevAng = ang;
      prog = Phaser.Math.Clamp(prog + diff * 0.45, 0, 1);
      cart.x = -260 + prog * 520;
      if (!completado && prog >= 0.9) {
        drag = false;
        completado = true;
        wheel.disableInteractive();
        this.tweens.add({
          targets: cart,
          x: 240,
          y: -30,
          duration: 600,
          ease: "Sine.easeInOut",
          onComplete: () => {
            ring.destroy();
            rotArrow.destroy();
            this.reaccionRobot();
            this.estallidoConfeti(cont.x + 260, cont.y - 30);
            this.avanzarPuzzle();
          },
        });
      }
    });
    // Girar sólo con la manija
    handle.setInteractive(
      new Phaser.Geom.Circle(36, 0, 16),
      Phaser.Geom.Circle.Contains,
    );
    handle.on("pointerdown", (p) => {
      if (completado) return;
      drag = true;
      const lp = wheel.getLocalPoint(p.x, p.y);
      prevAng = Math.atan2(lp.y, lp.x);
      this.tweens.add({
        targets: handle,
        scaleX: 1.12,
        scaleY: 1.12,
        duration: 120,
        yoyo: true,
      });
    });
    handle.on("pointerup", () => {
      drag = false;
    });
    handle.on("pointerout", () => {
      drag = false;
    });
    handle.on("pointermove", (p) => {
      if (!drag) return;
      const lp = wheel.getLocalPoint(p.x, p.y);
      const ang = Math.atan2(lp.y, lp.x);
      let diff = ang - prevAng;
      diff = Phaser.Math.Angle.Wrap(diff);
      wheel.rotation += diff;
      prevAng = ang;
      prog = Phaser.Math.Clamp(prog + diff * 0.45, 0, 1);
      cart.x = -260 + prog * 520;
      if (!completado && prog >= 0.9) {
        drag = false;
        completado = true;
        wheel.disableInteractive();
        handle.disableInteractive();
        this.tweens.add({
          targets: cart,
          x: 240,
          y: -30,
          duration: 600,
          ease: "Sine.easeInOut",
          onComplete: () => {
            ring.destroy();
            rotArrow.destroy();
            this.reaccionRobot();
            this.estallidoConfeti(cont.x + 260, cont.y - 30);
            this.avanzarPuzzle();
          },
        });
      }
    });
  }

  engranajesPuzzle(cont) {
    const gBase = this.add.graphics();
    gBase.fillStyle(0x34d399, 0.15);
    gBase.fillRoundedRect(-380, -140, 760, 280, 22);
    cont.add(gBase);

    const crearEngranaje = (x, y, r, color) => {
      const c = this.add.container(x, y);
      const g = this.add.graphics();
      g.fillStyle(0xffffff, 1);
      g.fillCircle(0, 0, r - 10);
      g.lineStyle(4, color, 1);
      g.strokeCircle(0, 0, r - 10);
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * Math.PI * 2;
        const tx = Math.cos(ang) * (r - 4);
        const ty = Math.sin(ang) * (r - 4);
        g.fillStyle(color, 1);
        g.fillRoundedRect(tx - 8, ty - 4, 16, 8, 3);
      }
      const eje = this.add.graphics();
      eje.fillStyle(0x9ca3af, 1);
      eje.fillCircle(0, 0, 8);
      eje.lineStyle(2, 0x4b5563, 1);
      eje.strokeCircle(0, 0, 8);
      c.add([g, eje]);
      return c;
    };

    const g1 = crearEngranaje(-180, -40, 70, 0x3b82f6);
    const g2 = crearEngranaje(0, 0, 80, 0xf59e0b);
    const g3 = crearEngranaje(180, -40, 60, 0x10b981);
    cont.add([g1, g2, g3]);

    const bombilla = this.add.graphics();
    bombilla.fillStyle(0xfde68a, 1);
    bombilla.fillCircle(0, -110, 18);
    bombilla.lineStyle(3, 0xf59e0b, 1);
    bombilla.strokeCircle(0, -110, 18);
    bombilla.alpha = 0.6;
    cont.add(bombilla);

    const correcto = 1;
    const activar = (idx) => {
      const gears = [g1, g2, g3];
      const dirs = [1, -1, 1];
      this.tweens.add({
        targets: gears[idx],
        rotation: "+=" + Math.PI * 2 * dirs[idx],
        duration: 1200,
        ease: "Sine.easeInOut",
      });
      for (let i = 0; i < gears.length; i++) {
        if (i === idx) continue;
        this.tweens.add({
          targets: gears[i],
          rotation: "+=" + Math.PI * 2 * -dirs[idx],
          duration: 1200,
          ease: "Sine.easeInOut",
        });
      }
      if (idx === correcto) {
        this.tweens.add({
          targets: bombilla,
          alpha: { from: 0.6, to: 1 },
          scaleX: { from: 1, to: 1.2 },
          scaleY: { from: 1, to: 1.2 },
          duration: 800,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            this.reaccionRobot();
            this.estallidoConfeti(cont.x, cont.y - 110);
            this.finalizarNivel();
          },
        });
      }
    };

    [g1, g2, g3].forEach((gear, i) => {
      gear.setSize(90, 90);
      gear.setInteractive(
        new Phaser.Geom.Circle(0, 0, 60),
        Phaser.Geom.Circle.Contains,
      );
      gear.on("pointerover", () => {
        this.tweens.add({
          targets: gear,
          scaleX: 1.06,
          scaleY: 1.06,
          duration: 120,
          yoyo: true,
        });
      });
      gear.on("pointerdown", () => {
        activar(i);
      });
    });

    const r1 = this.crearAnilloPulsante(-180, -40, 20, 0x3b82f6);
    const r2 = this.crearAnilloPulsante(0, 0, 22, 0xf59e0b);
    const r3 = this.crearAnilloPulsante(180, -40, 18, 0x10b981);
    cont.add(r1);
    cont.add(r2);
    cont.add(r3);
  }

  llavePuzzle(cont) {
    const gBase = this.add.graphics();
    gBase.fillStyle(0x34d399, 0.15);
    gBase.fillRoundedRect(-380, -140, 760, 280, 22);
    cont.add(gBase);

    const candado = this.add.container(240, -40);
    const cuerpo = this.add.graphics();
    cuerpo.fillStyle(0xe5e7eb, 1);
    cuerpo.fillRoundedRect(-40, -20, 80, 60, 12);
    cuerpo.lineStyle(3, 0x93c5fd, 1);
    cuerpo.strokeRoundedRect(-40, -20, 80, 60, 12);
    const arco = this.add.graphics();
    arco.lineStyle(6, 0x93c5fd, 1);
    arco.strokeCircle(0, -36, 22);
    const ojo = this.add.graphics();
    ojo.fillStyle(0x374151, 1);
    ojo.fillCircle(0, 0, 6);
    candado.add([cuerpo, arco, ojo]);
    cont.add(candado);

    const llave = this.add.container(-260, 60);
    const k = this.add.graphics();
    k.fillStyle(0xf59e0b, 1);
    k.fillCircle(0, 0, 14);
    k.fillRoundedRect(8, -4, 36, 8, 4);
    k.fillRoundedRect(40, -8, 10, 16, 3);
    k.lineStyle(3, 0x92400e, 1);
    k.strokeCircle(0, 0, 14);
    llave.add(k);
    cont.add(llave);

    const ring = this.crearAnilloPulsante(0, 0, 20, 0xf59e0b);
    const flecha1 = this.crearFlechaHint(-100, 0, 0, 0x4b5563);
    const flecha2 = this.crearFlechaHint(0, 0, 0, 0x4b5563);
    llave.add(ring);
    llave.add(flecha1);
    llave.add(flecha2);

    llave.setSize(80, 80);
    llave.setInteractive(
      new Phaser.Geom.Circle(0, 0, 22),
      Phaser.Geom.Circle.Contains,
    );
    let drag = false;
    const sx = -260;
    const sy = 60;
    llave.on("pointerdown", () => {
      drag = true;
    });
    this.input.on("pointerup", () => {
      if (!drag) return;
      drag = false;
      const dist = Phaser.Math.Distance.Between(llave.x, llave.y, 240, -40);
      if (dist < 70) {
        llave.disableInteractive();
        this.tweens.add({
          targets: llave,
          x: 240,
          y: -40,
          rotation: 0.3,
          duration: 600,
          ease: "Sine.easeInOut",
          onComplete: () => {
            ring.destroy();
            flecha1.destroy();
            flecha2.destroy();
            this.reaccionRobot();
            this.estallidoConfeti(cont.x + 240, cont.y - 40);
            this.finalizarNivel();
          },
        });
      } else {
        this.tweens.add({
          targets: llave,
          x: sx,
          y: sy,
          duration: 400,
          ease: "Sine.easeInOut",
        });
      }
    });
    this.input.on("pointermove", (p) => {
      if (!drag) return;
      const lp = cont.getLocalPoint(p.x, p.y);
      llave.x = Phaser.Math.Clamp(lp.x, -360, 360);
      llave.y = Phaser.Math.Clamp(lp.y, -140, 140);
    });
  }

  engrasePuzzle(cont) {
    const base = this.add.graphics();
    base.fillStyle(0xe5e7eb, 1);
    base.fillRoundedRect(-380, -140, 760, 280, 22);
    base.lineStyle(4, 0x9ca3af, 1);
    base.strokeRoundedRect(-380, -140, 760, 280, 22);
    const rail = this.add.graphics();
    rail.fillStyle(0xd1d5db, 1);
    rail.fillRoundedRect(-260, -10, 520, 26, 10);
    rail.lineStyle(2, 0x9ca3af, 1);
    rail.strokeRoundedRect(-260, -10, 520, 26, 10);
    rail.fillStyle(0x9ca3af, 1);
    for (let i = 0; i < 6; i++) {
      rail.fillRoundedRect(-240 + i * 100, -8, 18, 22, 6);
    }
    cont.add(base);
    cont.add(rail);

    const crearEngranaje = (x, y, r, color) => {
      const c = this.add.container(x, y);
      const g = this.add.graphics();
      g.fillStyle(0xf9fafb, 1);
      g.fillCircle(0, 0, r - 12);
      g.lineStyle(4, 0x6b7280, 1);
      g.strokeCircle(0, 0, r - 12);
      g.fillStyle(0xe5e7eb, 1);
      g.fillCircle(0, 0, r - 20);
      g.lineStyle(2, 0x9ca3af, 1);
      g.strokeCircle(0, 0, r - 20);
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const tx = Math.cos(ang) * (r - 4);
        const ty = Math.sin(ang) * (r - 4);
        g.fillStyle(0x9ca3af, 1);
        g.fillRoundedRect(tx - 7, ty - 4, 14, 8, 3);
      }
      const tornillos = this.add.graphics();
      tornillos.fillStyle(0x6b7280, 1);
      for (let i = 0; i < 4; i++) {
        const ang = (i / 4) * Math.PI * 2;
        const rx = Math.cos(ang) * (r - 26);
        const ry = Math.sin(ang) * (r - 26);
        tornillos.fillCircle(rx, ry, 3);
      }
      const eje = this.add.graphics();
      eje.fillStyle(0xd1d5db, 1);
      eje.fillCircle(0, 0, 9);
      eje.lineStyle(2, 0x4b5563, 1);
      eje.strokeCircle(0, 0, 9);
      c.add([g, tornillos, eje]);
      return c;
    };

    const g1 = crearEngranaje(-160, -20, 70, 0x3b82f6);
    const g2 = crearEngranaje(0, 30, 80, 0xf59e0b);
    const g3 = crearEngranaje(160, -30, 60, 0x10b981);
    cont.add([g1, g2, g3]);

    const aceitero = this.add.container(-280, 80);
    const can = this.add.graphics();
    can.fillStyle(0xf59e0b, 1);
    can.fillRoundedRect(-26, -14, 52, 28, 10);
    can.lineStyle(3, 0x92400e, 1);
    can.strokeRoundedRect(-26, -14, 52, 28, 10);
    can.fillStyle(0xfde68a, 0.6);
    can.fillRoundedRect(-22, -10, 30, 8, 4);
    can.fillStyle(0x92400e, 1);
    can.fillRoundedRect(-8, -20, 16, 8, 4);
    can.fillStyle(0x92400e, 1);
    can.beginPath();
    can.moveTo(10, -4);
    can.lineTo(34, 0);
    can.lineTo(34, 6);
    can.lineTo(10, 2);
    can.closePath();
    can.fillPath();
    can.lineStyle(3, 0x92400e, 1);
    can.beginPath();
    can.arc(-20, 0, 10, Math.PI / 2, (Math.PI * 3) / 2);
    can.strokePath();
    const gota = this.add.graphics();
    gota.fillStyle(0xfcd34d, 1);
    gota.fillCircle(34, -2, 4);
    gota.fillStyle(0xfbbf24, 1);
    gota.fillCircle(35, -1, 2);
    aceitero.add([can, gota]);
    cont.add(aceitero);

    const rCan = this.crearAnilloPulsante(0, 0, 20, 0xf59e0b);
    aceitero.add(rCan);

    const manoAceite = this.add.text(0, 26, "👆", {
      fontFamily: "Arial",
      fontSize: "38px",
      color: "#ffffff",
    });
    manoAceite.setOrigin(0.5);
    aceitero.add(manoAceite);
    this.tweens.add({
      targets: manoAceite,
      y: { from: manoAceite.y, to: manoAceite.y + 7 },
      scaleX: { from: 1, to: 1.06 },
      scaleY: { from: 1, to: 0.92 },
      duration: 650,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    const objetivos = [g1, g2, g3].map((gear, idx) => {
      const color = [0x3b82f6, 0xf59e0b, 0x10b981][idx];
      const mark = this.add.graphics();
      mark.x = cont.x + gear.x;
      mark.y = cont.y + gear.y;
      mark.fillStyle(0xffffff, 0.9);
      mark.fillCircle(0, 0, 10);
      mark.lineStyle(3, color, 1);
      mark.strokeCircle(0, 0, 12);
      this.tweens.add({
        targets: mark,
        scaleX: { from: 1, to: 1.1 },
        scaleY: { from: 1, to: 1.1 },
        duration: 900,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });

      const arrow = this.crearFlechaHint(
        cont.x + gear.x,
        cont.y + gear.y - 60,
        0,
        color,
      );

      return { cont: gear, x: gear.x, y: gear.y, ok: false, mark, arrow };
    });

    aceitero.setSize(70, 40);
    aceitero.setInteractive(
      new Phaser.Geom.Rectangle(-24, -12, 70, 40),
      Phaser.Geom.Rectangle.Contains,
    );
    let drag = false;
    aceitero.on("pointerdown", () => {
      drag = true;
    });
    this.input.on("pointerup", () => {
      if (!drag) return;
      drag = false;
      for (let i = 0; i < objetivos.length; i++) {
        const o = objetivos[i];
        if (o.ok) continue;
        const d = Phaser.Math.Distance.Between(
          aceitero.x,
          aceitero.y,
          o.x,
          o.y,
        );
        if (d < 46) {
          const tipX = aceitero.x + 34;
          const tipY = aceitero.y;
          const drop = this.add.graphics();
          drop.fillStyle(0xfcd34d, 1);
          drop.fillCircle(tipX, tipY, 5);
          drop.lineStyle(2, 0xf59e0b, 0.9);
          drop.strokeCircle(tipX, tipY, 5);
          cont.add(drop);
          this.tweens.add({
            targets: drop,
            x: o.x - tipX,
            y: o.y - tipY,
            duration: 380,
            ease: "Sine.easeInOut",
            onComplete: () => {
              o.ok = true;
              o.mark.destroy();
              drop.destroy();
              const aceite = this.add.graphics();
              aceite.fillStyle(0xfcd34d, 0.85);
              aceite.fillCircle(0, 0, 9);
              aceite.lineStyle(2, 0xf59e0b, 0.8);
              aceite.strokeCircle(0, 0, 9);
              o.cont.add(aceite);
              this.tweens.add({
                targets: aceite,
                alpha: { from: 1, to: 0.9 },
                scaleX: { from: 1, to: 1.06 },
                scaleY: { from: 1, to: 1.06 },
                duration: 300,
                yoyo: true,
              });
              const completos = objetivos.filter((t) => t.ok).length;
              if (completos === objetivos.length) {
                this.tweens.add({
                  targets: [g1, g2, g3],
                  rotation: "+=" + Math.PI * 2,
                  duration: 1200,
                  ease: "Sine.easeInOut",
                  onComplete: () => {
                    rCan.destroy();
                    this.reaccionRobot();
                    this.estallidoConfeti(cont.x, cont.y - 80);
                    this.finalizarNivel();
                  },
                });
              }
            },
          });
          break;
        }
      }
    });
    this.input.on("pointermove", (p) => {
      if (!drag) return;
      const lp = cont.getLocalPoint(p.x, p.y);
      aceitero.x = Phaser.Math.Clamp(lp.x, -360, 360);
      aceitero.y = Phaser.Math.Clamp(lp.y, -140, 140);
    });
  }

  reaccionRobot() {
    if (!this.robot) return;
    this.tweens.add({
      targets: this.robot,
      scaleX: { from: 1, to: 1.06 },
      scaleY: { from: 1, to: 1.06 },
      duration: 280,
      yoyo: true,
      ease: "Back.out",
    });
    const brillo = this.add.graphics();
    brillo.lineStyle(3, 0xf59e0b, 0.7);
    brillo.strokeRoundedRect(this.robot.x - 40, this.robot.y - 60, 80, 120, 16);
    this.tweens.add({
      targets: brillo,
      alpha: 0,
      duration: 600,
      onComplete: () => brillo.destroy(),
    });
  }

  estallidoConfeti(x, y) {
    const colores = [0xf59e0b, 0xfcd34d, 0x60a5fa, 0x10b981, 0xef4444];
    for (let i = 0; i < 24; i++) {
      const c = this.add.graphics();
      c.fillStyle(colores[Math.floor(Math.random() * colores.length)], 1);
      const r = 4 + Math.random() * 4;
      c.fillCircle(0, 0, r);
      c.x = x;
      c.y = y;
      this.tweens.add({
        targets: c,
        x: x + (Math.random() - 0.5) * 160,
        y: y + (Math.random() - 0.5) * 120,
        alpha: { from: 1, to: 0 },
        duration: 900 + Math.random() * 400,
        rotation: Math.random() * Math.PI * 2,
        onComplete: () => c.destroy(),
      });
    }
  }

  avanzarPuzzle() {
    const w = this.scale.width;
    const h = this.scale.height;
    const overlay = this.add.container(w / 2, h / 2);
    overlay.setDepth(1500);
    overlay.alpha = 0;

    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.35);
    bg.fillRect(-w, -h, w * 2, h * 2);

    const panel = this.add.graphics();
    panel.fillStyle(0xfffbeb, 1);
    panel.fillRoundedRect(-220, -90, 440, 180, 30);
    panel.lineStyle(6, 0xf59e0b, 1);
    panel.strokeRoundedRect(-220, -90, 440, 180, 30);

    const estrella = this.add.graphics();
    estrella.fillStyle(0xfbbf24, 1);
    estrella.lineStyle(4, 0xf59e0b, 1);
    const cx = 0;
    const cy = -10;
    const outer = 40;
    const inner = 18;
    estrella.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (Math.PI * i) / 5;
      const r = i % 2 === 0 ? outer : inner;
      const px = cx + Math.cos(rad - Math.PI / 2) * r;
      const py = cy + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrella.moveTo(px, py);
      else estrella.lineTo(px, py);
    }
    estrella.closePath();
    estrella.strokePath();
    estrella.fillPath();

    const estrellaL = this.add.graphics();
    estrellaL.fillStyle(0xfef3c7, 1);
    estrellaL.lineStyle(3, 0xf59e0b, 1);
    estrellaL.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (Math.PI * i) / 5;
      const r = i % 2 === 0 ? 20 : 9;
      const px = -130 + Math.cos(rad - Math.PI / 2) * r;
      const py = -20 + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrellaL.moveTo(px, py);
      else estrellaL.lineTo(px, py);
    }
    estrellaL.closePath();
    estrellaL.strokePath();
    estrellaL.fillPath();

    const estrellaR = this.add.graphics();
    estrellaR.fillStyle(0xfef3c7, 1);
    estrellaR.lineStyle(3, 0xf59e0b, 1);
    estrellaR.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (Math.PI * i) / 5;
      const r = i % 2 === 0 ? 20 : 9;
      const px = 130 + Math.cos(rad - Math.PI / 2) * r;
      const py = -20 + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrellaR.moveTo(px, py);
      else estrellaR.lineTo(px, py);
    }
    estrellaR.closePath();
    estrellaR.strokePath();
    estrellaR.fillPath();

    const aro = this.add.graphics();
    aro.lineStyle(3, 0xfbbf24, 0.9);
    aro.strokeCircle(0, -10, 70);

    overlay.add([bg, panel, aro, estrella, estrellaL, estrellaR]);

    this.tweens.add({
      targets: estrella,
      scaleX: { from: 1, to: 1.15 },
      scaleY: { from: 1, to: 1.15 },
      angle: { from: -8, to: 8 },
      duration: 600,
      yoyo: true,
      repeat: -1,
    });
    this.tweens.add({
      targets: [estrellaL, estrellaR],
      alpha: { from: 1, to: 0.4 },
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.tweens.add({
      targets: overlay,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 0.9, to: 1 },
      scaleY: { from: 0.9, to: 1 },
      duration: 500,
      ease: "Back.out",
      yoyo: false,
    });

    this.estallidoConfeti(w / 2, h / 2 - 40);

    this.time.delayedCall(1300, () => {
      overlay.destroy();
      this.puzzleActual = Math.min(2, this.puzzleActual + 1);
      this.mostrarPuzzle(this.puzzleActual);
    });
  }

  finalizarNivel() {
    const w = this.scale.width;
    const h = this.scale.height;
    const overlay = this.add.container(w / 2, h / 2);
    overlay.setDepth(1600);
    overlay.alpha = 0;

    const bg = this.add.graphics();
    bg.fillStyle(0x000000, 0.45);
    bg.fillRect(-w, -h, w * 2, h * 2);

    const panel = this.add.graphics();
    panel.fillStyle(0xfffbeb, 1);
    panel.fillRoundedRect(-260, -120, 520, 240, 32);
    panel.lineStyle(6, 0xf59e0b, 1);
    panel.strokeRoundedRect(-260, -120, 520, 240, 32);

    const estrella = this.add.graphics();
    estrella.fillStyle(0xfbbf24, 1);
    estrella.lineStyle(4, 0xf59e0b, 1);
    const cx = 0;
    const cy = -40;
    const outer = 48;
    const inner = 22;
    estrella.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (Math.PI * i) / 5;
      const r = i % 2 === 0 ? outer : inner;
      const px = cx + Math.cos(rad - Math.PI / 2) * r;
      const py = cy + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrella.moveTo(px, py);
      else estrella.lineTo(px, py);
    }
    estrella.closePath();
    estrella.strokePath();
    estrella.fillPath();

    const estrellaS1 = this.add.graphics();
    estrellaS1.fillStyle(0xfef3c7, 1);
    estrellaS1.lineStyle(3, 0xf59e0b, 1);
    estrellaS1.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (Math.PI * i) / 5;
      const r = i % 2 === 0 ? 22 : 10;
      const px = -150 + Math.cos(rad - Math.PI / 2) * r;
      const py = -10 + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrellaS1.moveTo(px, py);
      else estrellaS1.lineTo(px, py);
    }
    estrellaS1.closePath();
    estrellaS1.strokePath();
    estrellaS1.fillPath();

    const estrellaS2 = this.add.graphics();
    estrellaS2.fillStyle(0xfef3c7, 1);
    estrellaS2.lineStyle(3, 0xf59e0b, 1);
    estrellaS2.beginPath();
    for (let i = 0; i < 10; i++) {
      const rad = (Math.PI * i) / 5;
      const r = i % 2 === 0 ? 22 : 10;
      const px = 150 + Math.cos(rad - Math.PI / 2) * r;
      const py = -10 + Math.sin(rad - Math.PI / 2) * r;
      if (i === 0) estrellaS2.moveTo(px, py);
      else estrellaS2.lineTo(px, py);
    }
    estrellaS2.closePath();
    estrellaS2.strokePath();
    estrellaS2.fillPath();

    const aro = this.add.graphics();
    aro.lineStyle(4, 0xfbbf24, 0.9);
    aro.strokeCircle(0, -40, 86);

    const txt = this.add.text(-210, 30, "¡Fantástico!", {
      fontFamily: "Arial",
      fontSize: "36px",
      color: "#f97316",
      fontStyle: "bold",
    });

    const txt2 = this.add.text(-210, 78, "¡Has completado todos los puzzles!", {
      fontFamily: "Arial",
      fontSize: "26px",
      color: "#374151",
    });

    const btn = this.add.container(0, 132);
    const btnG = this.add.graphics();
    btnG.fillStyle(0xf97316, 1);
    btnG.fillRoundedRect(-120, -26, 240, 52, 18);
    btnG.lineStyle(4, 0xea580c, 1);
    btnG.strokeRoundedRect(-120, -26, 240, 52, 18);
    const btnTxt = this.add
      .text(0, -4, "Volver a jugar", {
        fontFamily: "Arial",
        fontSize: "24px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);
    btn.add([btnG, btnTxt]);
    btn.setSize(240, 52);
    btn.setInteractive(
      new Phaser.Geom.Rectangle(-120, -26, 240, 52),
      Phaser.Geom.Rectangle.Contains,
    );
    btn.on("pointerdown", () => {
      this.tweens.add({
        targets: btn,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          overlay.destroy();
          this.puzzleActual = 0;
          this.mostrarPuzzle(this.puzzleActual);
        },
      });
    });

    overlay.add([
      bg,
      panel,
      aro,
      estrella,
      estrellaS1,
      estrellaS2,
      txt,
      txt2,
      btn,
    ]);

    this.tweens.add({
      targets: overlay,
      alpha: { from: 0, to: 1 },
      scaleX: { from: 0.9, to: 1 },
      scaleY: { from: 0.9, to: 1 },
      duration: 550,
      ease: "Back.out",
    });

    this.tweens.add({
      targets: estrella,
      scaleX: { from: 1, to: 1.18 },
      scaleY: { from: 1, to: 1.18 },
      angle: { from: -10, to: 10 },
      duration: 700,
      yoyo: true,
      repeat: -1,
    });
    this.tweens.add({
      targets: [estrellaS1, estrellaS2],
      alpha: { from: 1, to: 0.4 },
      duration: 900,
      yoyo: true,
      repeat: -1,
    });

    this.estallidoConfeti(w / 2, h / 2 - 40);
    this.time.delayedCall(600, () => {
      this.estallidoConfeti(w / 2 - 180, h / 2 - 20);
    });
    this.time.delayedCall(1100, () => {
      this.estallidoConfeti(w / 2 + 180, h / 2 - 20);
    });
  }

  camaraFlash(cb) {
    const w = this.scale.width;
    const h = this.scale.height;
    const flash = this.add.graphics();
    flash.fillStyle(0xffffff, 1);
    flash.fillRect(0, 0, w, h);
    flash.alpha = 0;
    this.tweens.add({
      targets: flash,
      alpha: 1,
      duration: 250,
      yoyo: true,
      onComplete: () => {
        flash.destroy();
        if (cb) cb();
      },
    });
  }

  crearFlechaHint(x, y, rotation, color) {
    const g = this.add.graphics();
    // sombra
    g.lineStyle(6, 0x000000, 0.15);
    g.beginPath();
    g.moveTo(2, -20);
    g.lineTo(2, 20);
    g.lineTo(-6, 8);
    g.moveTo(2, 20);
    g.lineTo(10, 8);
    g.strokePath();
    // flecha principal
    g.lineStyle(6, color, 1);
    g.beginPath();
    g.moveTo(0, -20);
    g.lineTo(0, 18);
    g.strokePath();
    g.fillStyle(color, 1);
    g.beginPath();
    g.moveTo(0, 18);
    g.lineTo(-12, 6);
    g.lineTo(12, 6);
    g.closePath();
    g.fillPath();
    // círculo base
    g.lineStyle(4, color, 0.8);
    g.strokeCircle(0, -22, 6);
    g.x = x;
    g.y = y;
    g.rotation = rotation;
    this.tweens.add({
      targets: g,
      y: y + 12,
      alpha: { from: 1, to: 0.5 },
      duration: 700,
      yoyo: true,
      repeat: -1,
    });
    return g;
  }

  crearAnilloPulsante(x, y, r, color) {
    const g = this.add.graphics();
    g.lineStyle(3, color, 1);
    g.strokeCircle(0, 0, r);
    g.x = x;
    g.y = y;
    this.tweens.add({
      targets: g,
      scaleX: { from: 1, to: 1.25 },
      scaleY: { from: 1, to: 1.25 },
      alpha: { from: 1, to: 0 },
      duration: 900,
      repeat: -1,
    });
    return g;
  }

  crearFlechaCurvaHint(x, y, color) {
    const g = this.add.graphics();
    g.lineStyle(4, color, 1);
    g.beginPath();
    g.arc(0, 0, 22, Math.PI * 0.2, Math.PI * 1.3);
    g.moveTo(Math.cos(Math.PI * 1.3) * 22, Math.sin(Math.PI * 1.3) * 22);
    g.lineTo(
      Math.cos(Math.PI * 1.3) * 22 - 8,
      Math.sin(Math.PI * 1.3) * 22 + 4,
    );
    g.moveTo(Math.cos(Math.PI * 1.3) * 22, Math.sin(Math.PI * 1.3) * 22);
    g.lineTo(
      Math.cos(Math.PI * 1.3) * 22 - 2,
      Math.sin(Math.PI * 1.3) * 22 + 9,
    );
    g.strokePath();
    g.x = x;
    g.y = y;
    this.tweens.add({
      targets: g,
      alpha: { from: 0.9, to: 0.4 },
      rotation: "+=" + 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });
    return g;
  }

  update() {}
}
