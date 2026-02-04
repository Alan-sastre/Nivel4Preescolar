class ContextoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ContextoScene' });
        this.pasoActual = 0;
    }

    preload() {
        this.load.setBaseURL('');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Fondo con gradiente elegante
        this.crearFondoElegante(width, height);

        // Elementos decorativos animados
        this.crearElementosDecorativos(width, height);

        // Iniciar secuencia introductoria
        this.mostrarPantallaBienvenida(width, height);
    }

    crearFondoElegante(width, height) {
        // Gradiente principal de azul a morado
        const gradient = this.add.graphics();
        for (let y = 0; y < height; y++) {
            const ratio = y / height;
            const r = Math.floor(41 + (75 - 41) * ratio);
            const g = Math.floor(128 + (65 - 128) * ratio);
            const b = Math.floor(185 + (145 - 185) * ratio);
            gradient.fillStyle(Phaser.Display.Color.GetColor(r, g, b), 1);
            gradient.fillRect(0, y, width, 1);
        }

        // Círculos decorativos con blur
        const circulos = [
            { x: width * 0.15, y: height * 0.3, radius: 150, color: 0x6366F1, alpha: 0.15 },
            { x: width * 0.85, y: height * 0.6, radius: 200, color: 0x8B5CF6, alpha: 0.1 },
            { x: width * 0.5, y: height * 0.8, radius: 100, color: 0xEC4899, alpha: 0.08 }
        ];

        circulos.forEach((circ, index) => {
            const graphics = this.add.graphics();
            graphics.fillStyle(circ.color, circ.alpha);
            graphics.fillCircle(circ.x, circ.y, circ.radius);
            
            this.tweens.add({
                targets: graphics,
                scale: { from: 0.9, to: 1.1 },
                alpha: { from: circ.alpha, to: circ.alpha + 0.05 },
                duration: 4000 + index * 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }

    crearElementosDecorativos(width, height) {
        // Partículas flotantes
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 4 + 2;
            
            const particula = this.add.graphics();
            particula.fillStyle(0xFFFFFF, Math.random() * 0.3 + 0.1);
            particula.fillCircle(0, 0, size);
            particula.x = x;
            particula.y = y;

            this.tweens.add({
                targets: particula,
                y: y - 100,
                alpha: 0,
                duration: 3000 + Math.random() * 2000,
                repeat: -1,
                delay: Math.random() * 2000,
                ease: 'Power1'
            });
        }

        // Líneas onduladas decorativas
        const lineas = this.add.graphics();
        lineas.lineStyle(2, 0xFFFFFF, 0.1);
        
        for (let i = 0; i < 3; i++) {
            const y = height * (0.2 + i * 0.3);
            lineas.beginPath();
            lineas.moveTo(0, y);
            
            for (let x = 0; x < width; x += 50) {
                lineas.lineTo(x, y + Math.sin(x * 0.01) * 20);
            }
            lineas.strokePath();
        }
    }

    mostrarPantallaBienvenida(width, height) {
        this.limpiarPantalla();

        // Título principal
        const tituloY = height * 0.25;
        
        const sombra = this.add.text(width / 2 + 3, tituloY + 3, 'MÁQUINAS SIMPLES', {
            fontSize: this.calcularTamanioTexto(52),
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: '#000000'
        }).setOrigin(0.5);
        sombra.setAlpha(0.3);

        const titulo = this.add.text(width / 2, tituloY, 'MÁQUINAS SIMPLES', {
            fontSize: this.calcularTamanioTexto(52),
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: '#FFFFFF',
            stroke: '#1E3A8A',
            strokeThickness: 6
        }).setOrigin(0.5);

        const brillo = this.add.text(width / 2, tituloY, 'MÁQUINAS SIMPLES', {
            fontSize: this.calcularTamanioTexto(52),
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: '#60A5FA'
        }).setOrigin(0.5);
        brillo.setBlendMode(Phaser.BlendModes.ADD);
        brillo.setAlpha(0.5);

        this.tweens.add({
            targets: [titulo, sombra, brillo],
            scale: { from: 0, to: 1 },
            duration: 1000,
            ease: 'Back.out'
        });

        // Subtítulo
        const subtitulo = this.add.text(width / 2, height * 0.4, 'Herramientas magicas que hacen el trabajo mas facil', {
            fontSize: this.calcularTamanioTexto(26),
            fontFamily: 'Arial, sans-serif',
            color: '#E0E7FF',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        this.tweens.add({
            targets: subtitulo,
            alpha: { from: 0, to: 1 },
            duration: 1000,
            delay: 500
        });

        // Botón para comenzar
        const botonY = height * 0.65;
        const botonContainer = this.add.container(width / 2, botonY);
        
        const sombraBoton = this.add.graphics();
        sombraBoton.fillStyle(0x000000, 0.3);
        sombraBoton.fillRoundedRect(-170, -40, 340, 80, 20);
        sombraBoton.x = 5;
        sombraBoton.y = 5;
        
        const botonFondo = this.add.graphics();
        botonFondo.fillStyle(0xF59E0B, 1);
        botonFondo.fillRoundedRect(-170, -40, 340, 80, 20);
        
        const brilloSuperior = this.add.graphics();
        brilloSuperior.fillStyle(0xFFFFFF, 0.3);
        brilloSuperior.fillRoundedRect(-160, -35, 320, 30, 12);
        
        const botonTexto = this.add.text(0, 0, 'CONOCER LAS MAQUINAS', {
            fontSize: this.calcularTamanioTexto(24),
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        botonContainer.add([sombraBoton, botonFondo, brilloSuperior, botonTexto]);
        
        this.tweens.add({
            targets: botonContainer,
            scale: { from: 0, to: 1 },
            duration: 800,
            delay: 1000,
            ease: 'Back.out'
        });

        this.tweens.add({
            targets: botonContainer,
            scale: { from: 1, to: 1.03 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Footer
        this.crearFooterDecorativo(width, height);

        // Configurar interacción con hitArea
        const hitArea = new Phaser.Geom.Rectangle(-170, -40, 340, 80);
        botonContainer.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains);
        
        botonContainer.on('pointerover', () => {
            this.tweens.add({
                targets: botonContainer,
                scale: 1.08,
                duration: 200
            });
        });
        botonContainer.on('pointerout', () => {
            botonContainer.setScale(1);
        });
        botonContainer.on('pointerdown', () => {
            this.tweens.add({
                targets: botonContainer,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.pasoActual = 0;
                    this.mostrarExplicacionMaquina(width, height);
                }
            });
        });
    }

    mostrarExplicacionMaquina(width, height) {
        this.limpiarPantalla();

        const maquinas = [
            {
                nombre: 'La Palanca',
                color: 0xF59E0B,
                explicacion: 'Es una barra que se apoya en un punto.\nCuando empujas un lado, el otro se levanta.\n¡Así levantamos cosas pesadas!'
            },
            {
                nombre: 'La Polea',
                color: 0x10B981,
                explicacion: 'Es una rueda con una cuerda.\nNos ayuda a levantar objetos pesados.\n¡Jalando desde arriba o abajo!'
            },
            {
                nombre: 'La Rueda',
                color: 0x3B82F6,
                explicacion: 'Gira sobre su centro para moverse.\nNos transporta de un lugar a otro.\n¡Sin ruedas no hay bicicletas!'
            },
            {
                nombre: 'El Plano Inclinado',
                color: 0x8B5CF6,
                explicacion: 'Es una rampa para subir cosas.\nEmpujamos suave por la inclinación.\n¡Subimos sin hacer fuerza!'
            }
        ];

        const maquina = maquinas[this.pasoActual];

        // Panel principal - MÁS PEQUEÑO pero proporcional
        const panelWidth = Math.min(width * 0.85, 480);
        const panelHeight = Math.min(height * 0.75, 460);
        const panelY = height * 0.42;
        const panel = this.add.container(width / 2, panelY);
        
        const halfWidth = panelWidth / 2;
        const halfHeight = panelHeight / 2;
        
        // Sombra del panel
        const sombraPanel = this.add.graphics();
        sombraPanel.fillStyle(0x000000, 0.3);
        sombraPanel.fillRoundedRect(-halfWidth + 6, -halfHeight + 6, panelWidth, panelHeight, 20);
        panel.add(sombraPanel);
        
        // Fondo del panel
        const fondo = this.add.graphics();
        fondo.fillStyle(0xFFFBEB, 1);
        fondo.fillRoundedRect(-halfWidth, -halfHeight, panelWidth, panelHeight, 20);
        fondo.lineStyle(3, maquina.color, 0.6);
        fondo.strokeRoundedRect(-halfWidth, -halfHeight, panelWidth, panelHeight, 20);
        panel.add(fondo);
        
        // Barra de color superior
        const barraHeight = 60;
        const barraTop = this.add.graphics();
        barraTop.fillStyle(maquina.color, 1);
        barraTop.fillRoundedRect(-halfWidth + 3, -halfHeight + 3, panelWidth - 6, barraHeight, 18);
        
        // Brillo en la barra
        const barraBrillo = this.add.graphics();
        barraBrillo.fillStyle(0xFFFFFF, 0.3);
        barraBrillo.fillRoundedRect(-halfWidth + 3, -halfHeight + 3, panelWidth - 6, 30, 20);
        panel.add(barraTop);
        panel.add(barraBrillo);
        
        // Título en la barra
        const tituloY = -halfHeight + barraHeight / 2 + 3;
        const titulo = this.add.text(0, tituloY, maquina.nombre, {
            fontSize: this.calcularTamanioTexto(30),
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        panel.add(titulo);

        // ÁREA DE ILUSTRACIÓN - posición ajustada
        const areaIlustracionY = -halfHeight + barraHeight + 95;
        const radioIlustracion = Math.min(panelWidth * 0.20, 85);
        
        // Dibujar ilustración mejorada
        this.dibujarIlustracionMejorada(panel, maquina.nombre, areaIlustracionY, maquina.color, radioIlustracion);

        // TEXTO EXPLICATIVO - posición ajustada debajo de ilustración
        const textoY = areaIlustracionY + radioIlustracion + 35;
        const textoExplicacion = this.add.text(0, textoY, maquina.explicacion, {
            fontSize: this.calcularTamanioTexto(17),
            fontFamily: 'Arial, sans-serif',
            color: '#374151',
            align: 'center',
            lineSpacing: 6
        }).setOrigin(0.5);
        panel.add(textoExplicacion);

        // Indicador de progreso - más arriba en la parte inferior del panel
        const progresoY = halfHeight - 20;
        for (let i = 0; i < 4; i++) {
            const punto = this.add.graphics();
            const esActual = i === this.pasoActual;
            punto.fillStyle(esActual ? maquina.color : 0xD1D5DB, 1);
            punto.fillCircle((i - 1.5) * 40, progresoY, esActual ? 12 : 10);
            panel.add(punto);
        }

        // Botones de navegación - fuera del panel, más arriba
        const botonY = height - 55;
        
        // Botón Siguiente - más pequeño
        const textoBoton = this.pasoActual < 3 ? 'SIGUIENTE →' : '¡JUGAR! 🎮';
        const colorBoton = this.pasoActual < 3 ? 0x3B82F6 : 0xF59E0B;
        
        const boton = this.add.container(width / 2, botonY);
        
        const sombraBtn = this.add.graphics();
        sombraBtn.fillStyle(0x000000, 0.25);
        sombraBtn.fillRoundedRect(-100, -24, 200, 48, 12);
        sombraBtn.x = 3;
        sombraBtn.y = 3;
        
        const fondoBtn = this.add.graphics();
        fondoBtn.fillStyle(colorBoton, 1);
        fondoBtn.fillRoundedRect(-100, -24, 200, 48, 12);
        
        const brilloBtn = this.add.graphics();
        brilloBtn.fillStyle(0xFFFFFF, 0.25);
        brilloBtn.fillRoundedRect(-95, -21, 190, 18, 8);
        
        const texto = this.add.text(0, 0, textoBoton, {
            fontSize: this.calcularTamanioTexto(22),
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontStyle: 'bold',
            color: '#FFFFFF'
        }).setOrigin(0.5);
        
        boton.add([sombraBtn, fondoBtn, brilloBtn, texto]);
        
        this.tweens.add({
            targets: boton,
            scale: { from: 0, to: 1 },
            duration: 500,
            delay: 300,
            ease: 'Back.out'
        });

        // HitArea para el botón
        const hitAreaBtn = new Phaser.Geom.Rectangle(-100, -24, 200, 48);
        boton.setInteractive(hitAreaBtn, Phaser.Geom.Rectangle.Contains);
        
        boton.on('pointerover', () => {
            this.tweens.add({
                targets: boton,
                scale: 1.08,
                duration: 150
            });
        });
        boton.on('pointerout', () => {
            boton.setScale(1);
        });
        boton.on('pointerdown', () => {
            this.tweens.add({
                targets: boton,
                scale: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    if (this.pasoActual < 3) {
                        this.pasoActual++;
                        this.mostrarExplicacionMaquina(width, height);
                    } else {
                        this.scene.start('MinijuegoScene');
                    }
                }
            });
        });

        // Botón Atrás (excepto en la primera) - más pequeño
        if (this.pasoActual > 0) {
            const botonAtras = this.add.container(90, botonY);
            
            const sombraAtras = this.add.graphics();
            sombraAtras.fillStyle(0x000000, 0.25);
            sombraAtras.fillRoundedRect(-55, -20, 110, 40, 8);
            sombraAtras.x = 3;
            sombraAtras.y = 3;
            
            const fondoAtras = this.add.graphics();
            fondoAtras.fillStyle(0x6B7280, 1);
            fondoAtras.fillRoundedRect(-55, -20, 110, 40, 8);
            
            const textoAtras = this.add.text(0, 0, '← ATRÁS', {
                fontSize: this.calcularTamanioTexto(16),
                fontFamily: 'Arial Black, Arial, sans-serif',
                fontStyle: 'bold',
                color: '#FFFFFF'
            }).setOrigin(0.5);
            
            botonAtras.add([sombraAtras, fondoAtras, textoAtras]);
            
            // HitArea para botón atrás
            const hitAreaAtras = new Phaser.Geom.Rectangle(-55, -20, 110, 40);
            botonAtras.setInteractive(hitAreaAtras, Phaser.Geom.Rectangle.Contains);
            
            botonAtras.on('pointerover', () => {
                botonAtras.setScale(1.08);
            });
            botonAtras.on('pointerout', () => {
                botonAtras.setScale(1);
            });
            botonAtras.on('pointerdown', () => {
                this.pasoActual--;
                this.mostrarExplicacionMaquina(width, height);
            });
        }
    }

    dibujarIlustracionMejorada(panel, nombre, yPos, color, radio) {
        // Contenedor para la ilustración
        const ilustracionContainer = this.add.container(0, yPos);
        panel.add(ilustracionContainer);
        
        const g = this.add.graphics();
        ilustracionContainer.add(g);
        
        // Fondo circular decorativo
        g.fillStyle(0xFEF3C7, 0.6);
        g.fillCircle(0, 0, radio);
        g.lineStyle(3, color, 0.4);
        g.strokeCircle(0, 0, radio);
        
        // Líneas decorativas de fondo
        g.lineStyle(2, color, 0.15);
        for (let i = -2; i <= 2; i++) {
            g.beginPath();
            g.moveTo(i * 30, -radio + 10);
            g.lineTo(i * 30, radio - 10);
            g.strokePath();
        }
        
        if (nombre === 'La Palanca') {
            // PALANCA MEJORADA
            const escala = radio / 100;
            
            // Base/Fulcro (triángulo más grande)
            g.fillStyle(0x8B4513, 1);
            g.beginPath();
            g.moveTo(0, 35 * escala);
            g.lineTo(-25 * escala, 65 * escala);
            g.lineTo(25 * escala, 65 * escala);
            g.closePath();
            g.fillPath();
            
            // Brillo en el fulcro
            g.fillStyle(0xA0522D, 1);
            g.beginPath();
            g.moveTo(0, 40 * escala);
            g.lineTo(-15 * escala, 60 * escala);
            g.lineTo(15 * escala, 60 * escala);
            g.closePath();
            g.fillPath();
            
            // Barra de palanca (más gruesa y con gradiente simulado)
            g.fillStyle(color, 1);
            g.fillRoundedRect(-85 * escala, -8 * escala, 170 * escala, 16 * escala, 5 * escala);
            
            // Brillo en la barra
            g.fillStyle(0xFFFFFF, 0.4);
            g.fillRoundedRect(-85 * escala, -6 * escala, 170 * escala, 6 * escala, 3 * escala);
            
            // Peso izquierdo (rojo) - más detallado
            g.fillStyle(0xDC2626, 1);
            g.fillRect(-95 * escala, -5 * escala, 30 * escala, 30 * escala);
            g.lineStyle(2 * escala, 0x991B1B, 1);
            g.strokeRect(-95 * escala, -5 * escala, 30 * escala, 30 * escala);
            
            // Brillo en el peso
            g.fillStyle(0xFFFFFF, 0.3);
            g.fillRect(-92 * escala, -2 * escala, 24 * escala, 8 * escala);
            
            // Peso derecho (verde) - más detallado
            g.fillStyle(0x059669, 1);
            g.fillRect(65 * escala, 5 * escala, 30 * escala, 30 * escala);
            g.lineStyle(2 * escala, 0x047857, 1);
            g.strokeRect(65 * escala, 5 * escala, 30 * escala, 30 * escala);
            
            // Brillo en el peso
            g.fillStyle(0xFFFFFF, 0.3);
            g.fillRect(68 * escala, 8 * escala, 24 * escala, 8 * escala);
            
            // Flecha izquierda (hacia abajo)
            this.dibujarFlecha(g, -80 * escala, -35 * escala, -80 * escala, 5 * escala, 0x3B82F6, escala);
            
            // Flecha derecha (hacia arriba)
            this.dibujarFlecha(g, 80 * escala, 35 * escala, 80 * escala, -5 * escala, 0x3B82F6, escala);
            
        } else if (nombre === 'La Polea') {
            // POLEA MEJORADA
            const escala = radio / 100;
            
            // Soporte superior (más detallado)
            g.fillStyle(0x4B5563, 1);
            g.fillRect(-4 * escala, -90 * escala, 8 * escala, 35 * escala);
            g.fillRect(-35 * escala, -90 * escala, 70 * escala, 8 * escala);
            
            // Gancho del soporte
            g.lineStyle(4 * escala, 0x4B5563, 1);
            g.beginPath();
            g.arc(0, -90 * escala, 15 * escala, Math.PI, 0);
            g.strokePath();
            
            // Rueda de la polea (más grande y detallada)
            g.fillStyle(0xFFFFFF, 1);
            g.fillCircle(0, -45 * escala, 35 * escala);
            g.lineStyle(5 * escala, color, 1);
            g.strokeCircle(0, -45 * escala, 35 * escala);
            
            // Interior de la rueda
            g.fillStyle(0xE5E7EB, 1);
            g.fillCircle(0, -45 * escala, 25 * escala);
            g.fillStyle(0x9CA3AF, 1);
            g.fillCircle(0, -45 * escala, 10 * escala);
            
            // Cuerda izquierda (más gruesa)
            g.lineStyle(5 * escala, 0x92400E, 1);
            g.beginPath();
            g.moveTo(-25 * escala, -45 * escala);
            g.lineTo(-25 * escala, 70 * escala);
            g.strokePath();
            
            // Cuerda derecha
            g.beginPath();
            g.moveTo(25 * escala, -45 * escala);
            g.lineTo(25 * escala, 40 * escala);
            g.strokePath();
            
            // Peso grande (izquierda)
            g.fillStyle(0xDC2626, 1);
            g.fillRect(-42 * escala, 70 * escala, 35 * escala, 35 * escala);
            g.lineStyle(2 * escala, 0x991B1B, 1);
            g.strokeRect(-42 * escala, 70 * escala, 35 * escala, 35 * escala);
            
            // Peso pequeño (derecha)
            g.fillStyle(0xF59E0B, 1);
            g.fillRect(17 * escala, 40 * escala, 18 * escala, 18 * escala);
            g.lineStyle(2 * escala, 0xD97706, 1);
            g.strokeRect(17 * escala, 40 * escala, 18 * escala, 18 * escala);
            
            // Flecha de dirección
            this.dibujarFlecha(g, -25 * escala, 30 * escala, -25 * escala, 10 * escala, 0x10B981, escala);
            
        } else if (nombre === 'La Rueda') {
            // RUEDA MEJORADA
            const escala = radio / 100;
            
            // Neumático exterior
            g.fillStyle(0x1F2937, 1);
            g.fillCircle(0, 0, 60 * escala);
            
            // Goma del neumático
            g.fillStyle(0x374151, 1);
            g.fillCircle(0, 0, 50 * escala);
            
            // Llanta metálica
            g.fillStyle(0x9CA3AF, 1);
            g.fillCircle(0, 0, 42 * escala);
            g.lineStyle(3 * escala, 0x6B7280, 1);
            g.strokeCircle(0, 0, 42 * escala);
            
            // Rayos de la rueda (8 rayos)
            g.lineStyle(4 * escala, color, 0.9);
            for (let i = 0; i < 8; i++) {
                const angle = (i * 45) * Math.PI / 180;
                g.beginPath();
                g.moveTo(0, 0);
                g.lineTo(Math.cos(angle) * 38 * escala, Math.sin(angle) * 38 * escala);
                g.strokePath();
            }
            
            // Centro de la rueda
            g.fillStyle(0x4B5563, 1);
            g.fillCircle(0, 0, 15 * escala);
            g.fillStyle(0x6B7280, 1);
            g.fillCircle(0, 0, 8 * escala);
            g.fillStyle(0x9CA3AF, 1);
            g.fillCircle(0, 0, 4 * escala);
            
            // Flecha de rotación (arco grande)
            g.lineStyle(3 * escala, 0x10B981, 1);
            g.beginPath();
            g.arc(0, 0, 72 * escala, -0.5, 3.5);
            g.strokePath();
            
            // Punta de la flecha
            const arrowX = Math.cos(3.5) * 72 * escala;
            const arrowY = Math.sin(3.5) * 72 * escala;
            g.beginPath();
            g.moveTo(arrowX, arrowY);
            g.lineTo(arrowX - 10 * escala, arrowY - 8 * escala);
            g.lineTo(arrowX - 8 * escala, arrowY + 10 * escala);
            g.closePath();
            g.fillStyle(0x10B981, 1);
            g.fillPath();
            
        } else if (nombre === 'El Plano Inclinado') {
            // PLANO INCLINADO MEJORADO
            const escala = radio / 100;
            
            // Suelo/base
            g.fillStyle(0x4B5563, 1);
            g.fillRect(-95 * escala, 55 * escala, 190 * escala, 15 * escala);
            
            // Rampa (triángulo más suave)
            g.fillStyle(color, 0.25);
            g.beginPath();
            g.moveTo(-90 * escala, 55 * escala);
            g.lineTo(90 * escala, 55 * escala);
            g.lineTo(-90 * escala, -35 * escala);
            g.closePath();
            g.fillPath();
            
            // Línea de la rampa (borde)
            g.lineStyle(5 * escala, color, 1);
            g.beginPath();
            g.moveTo(-90 * escala, -35 * escala);
            g.lineTo(90 * escala, 55 * escala);
            g.strokePath();
            
            // Marcas de distancia en la rampa
            g.lineStyle(2 * escala, 0xFFFFFF, 0.5);
            for (let i = 1; i <= 3; i++) {
                const x = -90 * escala + (i * 45 * escala);
                const y = -35 * escala + (i * 30 * escala);
                g.beginPath();
                g.moveTo(x - 8 * escala, y - 5 * escala);
                g.lineTo(x + 8 * escala, y + 5 * escala);
                g.strokePath();
            }
            
            // Bloque en la rampa (posición intermedia)
            const blockX = -30 * escala;
            const blockY = 15 * escala;
            g.fillStyle(0xDC2626, 1);
            g.fillRect(blockX, blockY, 30 * escala, 30 * escala);
            g.lineStyle(2 * escala, 0x991B1B, 1);
            g.strokeRect(blockX, blockY, 30 * escala, 30 * escala);
            
            // Brillo en el bloque
            g.fillStyle(0xFFFFFF, 0.3);
            g.fillRect(blockX + 3 * escala, blockY + 3 * escala, 24 * escala, 10 * escala);
            
            // Flecha de dirección hacia abajo
            this.dibujarFlecha(g, blockX + 40 * escala, blockY + 5 * escala, blockX + 55 * escala, blockY + 25 * escala, 0x10B981, escala);
            
            // Altura indicada
            g.lineStyle(2 * escala, 0xF59E0B, 0.7);
            g.beginPath();
            g.moveTo(-90 * escala, -35 * escala);
            g.lineTo(-90 * escala, 55 * escala);
            g.strokePath();
            
            // Etiqueta "h"
            const hText = this.add.text(-110 * escala, 10 * escala, 'h', {
                fontSize: `${Math.round(20 * escala)}px`,
                fontFamily: 'Arial, sans-serif',
                fontStyle: 'italic',
                color: '#F59E0B'
            }).setOrigin(0.5);
            ilustracionContainer.add(hText);
        }
        
        // Animación de entrada
        ilustracionContainer.setScale(0);
        this.tweens.add({
            targets: ilustracionContainer,
            scale: 1,
            duration: 500,
            ease: 'Back.out(1.5)'
        });
    }
    
    dibujarFlecha(graphics, x1, y1, x2, y2, color, escala) {
        // Línea de la flecha
        graphics.lineStyle(3 * escala, color, 1);
        graphics.beginPath();
        graphics.moveTo(x1, y1);
        graphics.lineTo(x2, y2);
        graphics.strokePath();
        
        // Punta de la flecha
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const arrowLength = 10 * escala;
        const arrowAngle = 0.5;
        
        graphics.beginPath();
        graphics.moveTo(x2, y2);
        graphics.lineTo(
            x2 - arrowLength * Math.cos(angle - arrowAngle),
            y2 - arrowLength * Math.sin(angle - arrowAngle)
        );
        graphics.moveTo(x2, y2);
        graphics.lineTo(
            x2 - arrowLength * Math.cos(angle + arrowAngle),
            y2 - arrowLength * Math.sin(angle + arrowAngle)
        );
        graphics.strokePath();
    }

    crearFooterDecorativo(width, height) {
        // Barra inferior con gradiente
        const footer = this.add.graphics();
        for (let x = 0; x < width; x++) {
            const ratio = x / width;
            const alpha = 0.15 - (ratio * 0.05);
            footer.fillStyle(0x000000, alpha);
            footer.fillRect(x, height - 40, 1, 40);
        }

        // Círculos decorativos en el footer
        const circulosFooter = [
            { x: width * 0.1, color: 0xF59E0B },
            { x: width * 0.3, color: 0x10B981 },
            { x: width * 0.5, color: 0x3B82F6 },
            { x: width * 0.7, color: 0x8B5CF6 },
            { x: width * 0.9, color: 0xEC4899 }
        ];

        circulosFooter.forEach((circ, index) => {
            const graphics = this.add.graphics();
            graphics.fillStyle(circ.color, 0.4);
            graphics.fillCircle(circ.x, height - 20, 10);
            
            this.tweens.add({
                targets: graphics,
                scale: { from: 0.8, to: 1.2 },
                duration: 2000 + index * 300,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }

    limpiarPantalla() {
        // Guardar los elementos de fondo
        const elementosFondo = [];
        this.children.list.forEach(child => {
            if (child.type === 'Graphics' && !child.input) {
                elementosFondo.push(child);
            }
        });
        
        // Eliminar todos los elementos excepto el fondo
        this.children.list.slice().forEach(child => {
            if (!elementosFondo.includes(child)) {
                if (child.input) {
                    child.removeInteractive();
                }
                child.destroy();
            }
        });
    }

    calcularTamanioTexto(tamanioBase) {
        const width = this.scale.width;
        if (width < 600) {
            return Math.floor(tamanioBase * 0.6) + 'px';
        } else if (width < 1000) {
            return Math.floor(tamanioBase * 0.75) + 'px';
        }
        return tamanioBase + 'px';
    }
}
