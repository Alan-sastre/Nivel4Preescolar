class MinijuegoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MinijuegoScene' });
        this.preguntas = [
            { emoji: '🛝', objeto: 'Tobogan', respuesta: 'Plano', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '⚖️', objeto: 'Balanza', respuesta: 'Palanca', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '🚡', objeto: 'Teleferico', respuesta: 'Polea', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '🚲', objeto: 'Bicicleta', respuesta: 'Rueda', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '🏗️', objeto: 'Grua', respuesta: 'Polea', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '🛒', objeto: 'Carrito', respuesta: 'Rueda', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '✂️', objeto: 'Tijeras', respuesta: 'Palanca', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '🎡', objeto: 'Rueda de la fortuna', respuesta: 'Rueda', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '🚠', objeto: 'Elevador', respuesta: 'Polea', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] },
            { emoji: '📐', objeto: 'Rampa', respuesta: 'Plano', opciones: ['Palanca', 'Polea', 'Rueda', 'Plano'] }
        ];
        this.preguntaActual = 0;
        this.puntaje = 0;
        this.botonesActivos = true;
    }

    create() {
        this.gameObjects = [];
        this.preguntas.sort(() => Math.random() - 0.5);
        this.mostrarPregunta();
    }

    limpiarPantalla() {
        this.gameObjects.forEach(obj => {
            if (obj && obj.destroy) {
                obj.destroy();
            }
        });
        this.gameObjects = [];
    }

    agregarObjeto(obj) {
        this.gameObjects.push(obj);
        return obj;
    }

    mostrarPregunta() {
        this.limpiarPantalla();
        this.botonesActivos = true;
        
        const width = this.scale.width;
        const height = this.scale.height;

        if (this.preguntaActual >= this.preguntas.length) {
            this.mostrarFinal();
            return;
        }

        const pregunta = this.preguntas[this.preguntaActual];

        // FONDO GRADIENTE AZUL-MORADO
        const fondo = this.add.graphics();
        for (let y = 0; y < height; y++) {
            const ratio = y / height;
            const r = Math.floor(30 + (75 - 30) * ratio);
            const g = Math.floor(60 + (50 - 60) * ratio);
            const b = Math.floor(114 + (150 - 114) * ratio);
            fondo.fillStyle(Phaser.Display.Color.GetColor(r, g, b), 1);
            fondo.fillRect(0, y, width, 1);
        }
        this.agregarObjeto(fondo);

        // DECORACIÓN: CÍRCULOS SUAVES
        const decoracion1 = this.add.graphics();
        decoracion1.fillStyle(0xFFFFFF, 0.05);
        decoracion1.fillCircle(width * 0.2, height * 0.3, 150);
        this.agregarObjeto(decoracion1);

        const decoracion2 = this.add.graphics();
        decoracion2.fillStyle(0xFFFFFF, 0.03);
        decoracion2.fillCircle(width * 0.8, height * 0.7, 200);
        this.agregarObjeto(decoracion2);

        const panelW = Math.min(width * 0.85, 450);
        const panelH = Math.min(height * 0.75, 460);
        const centerX = width / 2;
        const centerY = height * 0.45;
        
        // PANEL CON SOMBRA
        const sombraPanel = this.add.graphics();
        sombraPanel.fillStyle(0x000000, 0.2);
        sombraPanel.fillRoundedRect(centerX - panelW/2 + 8, centerY - panelH/2 + 8, panelW, panelH, 30);
        this.agregarObjeto(sombraPanel);

        // PANEL PRINCIPAL - COLOR CREMA SUAVE
        const bg = this.add.graphics();
        bg.fillStyle(0xFFFBEB, 0.98);
        bg.fillRoundedRect(centerX - panelW/2, centerY - panelH/2, panelW, panelH, 30);
        bg.lineStyle(3, 0xFCD34D, 0.6);
        bg.strokeRoundedRect(centerX - panelW/2, centerY - panelH/2, panelW, panelH, 30);
        this.agregarObjeto(bg);

        // BARRA SUPERIOR DORADA
        const barra = this.add.graphics();
        barra.fillStyle(0xF59E0B, 1);
        barra.fillRoundedRect(centerX - panelW/2 + 4, centerY - panelH/2 + 4, panelW - 8, 60, 26);
        this.agregarObjeto(barra);

        // BRILLO EN LA BARRA
        const barraBrillo = this.add.graphics();
        barraBrillo.fillStyle(0xFFFFFF, 0.3);
        barraBrillo.fillRoundedRect(centerX - panelW/2 + 4, centerY - panelH/2 + 4, panelW - 8, 25, 20);
        this.agregarObjeto(barraBrillo);

        // TÍTULO
        const titulo = this.add.text(centerX, centerY - panelH/2 + 35, '¿QUÉ MÁQUINA ES?', {
            fontSize: '30px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: '#FFFFFF',
            stroke: '#92400E',
            strokeThickness: 3
        }).setOrigin(0.5);
        this.agregarObjeto(titulo);

        // PUNTAJE EN ESQUINA SUPERIOR IZQUIERDA
        const puntajeBg = this.add.graphics();
        puntajeBg.fillStyle(0xFFFFFF, 0.9);
        puntajeBg.fillRoundedRect(centerX - panelW/2 + 15, centerY - panelH/2 + 75, 90, 40, 20);
        puntajeBg.lineStyle(2, 0xF59E0B, 1);
        puntajeBg.strokeRoundedRect(centerX - panelW/2 + 15, centerY - panelH/2 + 75, 90, 40, 20);
        this.agregarObjeto(puntajeBg);

        const puntajeIcono = this.add.text(centerX - panelW/2 + 35, centerY - panelH/2 + 95, '🏆', {
            fontSize: '22px'
        }).setOrigin(0.5);
        this.agregarObjeto(puntajeIcono);
        
        const puntajeValor = this.add.text(centerX - panelW/2 + 75, centerY - panelH/2 + 95, `${this.puntaje}`, {
            fontSize: '24px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#F59E0B'
        }).setOrigin(0.5);
        this.agregarObjeto(puntajeValor);

        // CONTADOR EN ESQUINA SUPERIOR DERECHA
        const contadorBg = this.add.graphics();
        contadorBg.fillStyle(0xFFFFFF, 0.9);
        contadorBg.fillRoundedRect(centerX + panelW/2 - 105, centerY - panelH/2 + 75, 90, 40, 20);
        contadorBg.lineStyle(2, 0x3B82F6, 1);
        contadorBg.strokeRoundedRect(centerX + panelW/2 - 105, centerY - panelH/2 + 75, 90, 40, 20);
        this.agregarObjeto(contadorBg);

        const contador = this.add.text(centerX + panelW/2 - 60, centerY - panelH/2 + 95, 
            `${this.preguntaActual + 1}/${this.preguntas.length}`, {
            fontSize: '20px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#3B82F6'
        }).setOrigin(0.5);
        this.agregarObjeto(contador);

        // EMOJI CON CÍRCULO DE FONDO - MÁS PEQUEÑO Y SEPARADO
        const emojiY = centerY - panelH/2 + 140;
        
        const circuloEmoji = this.add.graphics();
        circuloEmoji.fillStyle(0xFEF3C7, 0.6);
        circuloEmoji.fillCircle(centerX, emojiY, 50);
        circuloEmoji.lineStyle(3, 0xFCD34D, 0.5);
        circuloEmoji.strokeCircle(centerX, emojiY, 50);
        this.agregarObjeto(circuloEmoji);

        const emoji = this.add.text(centerX, emojiY, pregunta.emoji, {
            fontSize: '70px'
        }).setOrigin(0.5);
        this.agregarObjeto(emoji);

        // NOMBRE DEL OBJETO - MÁS SEPARADO
        const nombreY = emojiY + 70;
        const nombre = this.add.text(centerX, nombreY, pregunta.objeto, {
            fontSize: '24px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#1E3A8A'
        }).setOrigin(0.5);
        this.agregarObjeto(nombre);

        // PREGUNTA - MÁS SEPARADA
        const preguntaTxt = this.add.text(centerX, nombreY + 35, '¿Qué máquina utiliza?', {
            fontSize: '18px',
            fontFamily: 'Arial, sans-serif',
            color: '#64748B'
        }).setOrigin(0.5);
        this.agregarObjeto(preguntaTxt);

        // BOTONES DE OPCIONES - MÁS SEPARADOS
        const colores = [0xF59E0B, 0x10B981, 0x3B82F6, 0x8B5CF6];
        const coloresHover = [0xFBBF24, 0x34D399, 0x60A5FA, 0xA78BFA];
        const emojisBtn = ['⚖️', '🔧', '☸️', '📐'];
        const startY = nombreY + 70;
        const espX = 150;
        const espY = 65;
        
        const respuestaCorrecta = pregunta.respuesta;
        
        pregunta.opciones.forEach((opcion, index) => {
            const col = index % 2;
            const row = Math.floor(index / 2);
            const x = centerX + (col === 0 ? -espX/2 : espX/2);
            const y = startY + row * espY;

            this.crearBoton(x, y, opcion, colores[index], coloresHover[index], emojisBtn[index], respuestaCorrecta);
        });

    }

    crearBoton(x, y, opcion, color, colorHover, emojiIcon, respuestaCorrecta) {
        const ancho = 135;
        const alto = 50;
        
        const boton = this.add.container(x, y);
        this.agregarObjeto(boton);
        
        // Sombra del botón
        const sombra = this.add.graphics();
        sombra.fillStyle(0x000000, 0.15);
        sombra.fillRoundedRect(-ancho/2 + 2, -alto/2 + 4, ancho, alto, 12);
        boton.add(sombra);

        // Fondo del botón
        const fondoBtn = this.add.graphics();
        fondoBtn.fillStyle(color, 1);
        fondoBtn.fillRoundedRect(-ancho/2, -alto/2, ancho, alto, 12);
        boton.add(fondoBtn);

        // Brillo superior
        const brillo = this.add.graphics();
        brillo.fillStyle(0xFFFFFF, 0.25);
        brillo.fillRoundedRect(-ancho/2 + 2, -alto/2 + 2, ancho - 4, 16, 8);
        boton.add(brillo);

        // Emoji del botón
        const emojiBtn = this.add.text(-ancho/2 + 22, 0, emojiIcon, {
            fontSize: '24px'
        }).setOrigin(0.5);
        boton.add(emojiBtn);

        // Texto del botón
        const textoBtn = this.add.text(10, 0, opcion, {
            fontSize: '18px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#FFFFFF',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#000000',
                blur: 2,
                fill: true
            }
        }).setOrigin(0.5);
        boton.add(textoBtn);

        const hitArea = new Phaser.Geom.Rectangle(-ancho/2, -alto/2, ancho, alto);
        boton.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        
        boton.opcionTexto = opcion;
        boton.respuestaCorrecta = respuestaCorrecta;
        boton.fondoBtn = fondoBtn;
        boton.colorOriginal = color;
        boton.colorHover = colorHover;
        
        boton.on('pointerover', () => {
            if (this.botonesActivos) {
                fondoBtn.clear();
                fondoBtn.fillStyle(colorHover, 1);
                fondoBtn.fillRoundedRect(-ancho/2, -alto/2, ancho, alto, 12);
                this.tweens.add({ 
                    targets: boton, 
                    scale: 1.05, 
                    duration: 150,
                    ease: 'Power2'
                });
            }
        });
        
        boton.on('pointerout', () => {
            fondoBtn.clear();
            fondoBtn.fillStyle(color, 1);
            fondoBtn.fillRoundedRect(-ancho/2, -alto/2, ancho, alto, 12);
            boton.setScale(1);
        });
        
        boton.on('pointerdown', () => {
            if (this.botonesActivos) {
                this.verificarRespuesta(opcion, respuestaCorrecta);
            }
        });
    }

    verificarRespuesta(seleccion, correcta) {
        if (!this.botonesActivos) return;
        
        const esCorrecta = seleccion.trim() === correcta.trim();
        
        if (esCorrecta) {
            this.botonesActivos = false;
            this.puntaje += 10;
            this.mostrarMensaje('¡CORRECTO! ✅', 0x10B981);
            
            // DELAY DE 1 SEGUNDO (1000ms) ANTES DE PASAR A LA SIGUIENTE
            this.time.delayedCall(1000, () => {
                this.preguntaActual++;
                this.mostrarPregunta();
            });
        } else {
            this.botonesActivos = false;
            this.mostrarMensaje('¡Inténtalo de nuevo! 🤔', 0xF59E0B);
            
            this.time.delayedCall(1000, () => {
                this.botonesActivos = true;
            });
        }
    }

    mostrarMensaje(texto, colorHex) {
        const width = this.scale.width;
        const height = this.scale.height;
        const colorStr = '#' + colorHex.toString(16).padStart(6, '0');
        
        // Fondo del mensaje
        const mensajeBg = this.add.graphics();
        mensajeBg.fillStyle(0xFFFFFF, 0.95);
        mensajeBg.fillRoundedRect(width/2 - 160, height/2 - 45, 320, 90, 20);
        mensajeBg.lineStyle(4, colorHex, 1);
        mensajeBg.strokeRoundedRect(width/2 - 160, height/2 - 45, 320, 90, 20);
        
        const mensaje = this.add.text(width / 2, height / 2, texto, {
            fontSize: '40px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: colorStr
        }).setOrigin(0.5);

        this.tweens.add({
            targets: [mensajeBg, mensaje],
            scale: { from: 0.8, to: 1 },
            alpha: { from: 0, to: 1 },
            duration: 300,
            ease: 'Back.out',
            onComplete: () => {
                this.tweens.add({
                    targets: [mensajeBg, mensaje],
                    alpha: 0,
                    duration: 200,
                    delay: 500,
                    onComplete: () => {
                        mensajeBg.destroy();
                        mensaje.destroy();
                    }
                });
            }
        });
    }

    mostrarFinal() {
        this.limpiarPantalla();
        
        const width = this.scale.width;
        const height = this.scale.height;

        // Fondo
        const fondo = this.add.graphics();
        fondo.fillGradientStyle(0x10B981, 0x10B981, 0x059669, 0x059669, 1);
        fondo.fillRect(0, 0, width, height);
        this.agregarObjeto(fondo);

        // Confeti
        for (let i = 0; i < 50; i++) {
            const confeti = this.add.graphics();
            const colores = [0xF59E0B, 0xFCD34D, 0xFFFFFF, 0x60A5FA];
            confeti.fillStyle(colores[Math.floor(Math.random() * colores.length)], 1);
            confeti.fillCircle(0, 0, Math.random() * 8 + 4);
            confeti.x = Math.random() * width;
            confeti.y = -20;
            
            this.tweens.add({
                targets: confeti,
                y: height + 20,
                x: confeti.x + (Math.random() - 0.5) * 200,
                rotation: Math.random() * Math.PI * 4,
                duration: 2000 + Math.random() * 2000,
                repeat: -1,
                delay: Math.random() * 2000
            });
            this.agregarObjeto(confeti);
        }

        const panel = this.add.container(width / 2, height / 2);
        this.agregarObjeto(panel);
        
        // Sombra
        const sombra = this.add.graphics();
        sombra.fillStyle(0x000000, 0.2);
        sombra.fillRoundedRect(-210, -160, 420, 320, 25);
        panel.add(sombra);

        // Fondo del panel
        const fondoPanel = this.add.graphics();
        fondoPanel.fillStyle(0xFFFFFF, 1);
        fondoPanel.fillRoundedRect(-200, -150, 400, 300, 25);
        fondoPanel.lineStyle(5, 0xF59E0B, 1);
        fondoPanel.strokeRoundedRect(-200, -150, 400, 300, 25);
        panel.add(fondoPanel);

        // Trofeo grande
        const trofeo = this.add.text(0, -90, '🏆', {
            fontSize: '70px'
        }).setOrigin(0.5);
        panel.add(trofeo);

        // Título
        const titulo = this.add.text(0, -25, '¡FELICIDADES!', {
            fontSize: '38px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#F59E0B'
        }).setOrigin(0.5);
        panel.add(titulo);

        // Mensaje
        const mensaje = this.add.text(0, 20, 'Completaste el juego', {
            fontSize: '22px',
            fontFamily: 'Arial, sans-serif',
            color: '#64748B'
        }).setOrigin(0.5);
        panel.add(mensaje);

        // Puntaje final
        const puntajeFinal = this.add.text(0, 55, `${this.puntaje} puntos`, {
            fontSize: '32px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            color: '#10B981'
        }).setOrigin(0.5);
        panel.add(puntajeFinal);

        // Animación del trofeo
        this.tweens.add({
            targets: trofeo,
            scale: { from: 0.9, to: 1.1 },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
}
