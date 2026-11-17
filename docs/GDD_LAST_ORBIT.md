# 🚀 GDD & Narrative Script: LAST ORBIT


## 1. Selección de Equipamiento y Tripulación

### Naves (Ships)

* **Pegaso-I**

  * **Texto UI:** *"Built to move fast. Its lightweight design reduces energy consumption on every maneuver and leaves enough room for 2 crew members, though its hull will take less punishment if the mission gets complicated."*

* **Hércules-IV**

  * **Texto UI:** *"Designed to withstand the harshest environments. Its armor absorbs critical impacts that others couldn't, but its heavy weight greatly increases energy consumption and limits the cabin to one companion."*

* **Talos-IA**

  * **Texto UI:** *"Integrates state-of-the-art technology to boost data collection. You will gain a major scientific advantage thanks to Danko, who will focus on gathering maximum data, plus you can choose one additional crew member. Unlike the others, it does not stand out for resource efficiency."*

### Artefactos (Instruments)

* **MIS-Lynceus**

  * **Texto UI:** *"Studies the comet's gases and light from a distance without touching the surface. It consumes little energy and keeps risk low due to the safe distance, though the scientific data obtained will be basic."*

* **SAL-Phoebus**

  * **Texto UI:** *"Fires high-powered laser pulses to vaporize rock and analyze what lies beneath the crust. Each pulse costs energy—manage it wisely to gather as much data as possible. It offers a major scientific breakthrough in exchange for a potential violent reaction."*

* **D2C2-Prometheus**

  * **Texto UI:** *"Anchors the ship directly onto the comet to drill deep into its core. It consumes massive amounts of energy and will trigger a severe imbalance in the comet, but is the only way to uncover what truly lies behind 3I/Nyx."*

### Tripulantes (Crew)

* **Eng. Danko** *(Ing. Danko)*

  * **Texto UI:** *"Graduated from UPIEM at IPN and specialized in deep-space links. He masters Earth transmission protocols and critical network architecture, though aboard Talos-IA his full attention will be dedicated to processing the data you gather, allowing for a much deeper analysis."*

* **Dr. Candy** *(Dra. Candy)*

  * **Texto UI:** *"Psychologist graduated from FES Iztacala at UNAM. Dedicated to monitoring mental fatigue, group cohesion, and human response to isolation; a profile focused on the team's emotional well-being during high-pressure flights."*

* **Chem. Jan** *(Quím. Jan)*

  * **Texto UI:** *"Pharmaceutical Biological Chemist graduated from FES Zaragoza at UNAM. An expert in space toxicology, medical compound synthesis, and biological response in hostile environments."*

* **Eng. Najo** *(Ing. Najo)*

  * **Texto UI:** *"Engineer graduated from the Faculty of Engineering at CU, UNAM. Specialized in propulsion systems, fluid mechanics, and structural maintenance under microgravity conditions."*

## 2. Flujo de Introducción y Despegue

### — Pantalla de Inicio —

* **Diálogo UI:** *"Hello!! Luke, congratulations on your promotion to Commander. I know how hard you worked to get here, and it is urgent that you see this. During a routine sweep by the Vera C. Rubin Observatory in the Chilean Andes, an uncataloged object was suddenly detected moving at hyperbolic speed."*

### — Pantalla Minijuego: Enfocar Cometa —

* **Instrucción UI:** *"Recover the image captured by the Observatory."*

* **Tooltip al pasar el cursor sobre el cometa:**

  > **OBJECT: 3I/NYX**
  > *"A giant ball of ancient ice and dust that releases gas and light as it approaches the Sun. Coming from outside our Solar System, studying it will allow us to discover what exists in another corner of the galaxy."*

### — Pantalla con la Imagen Completa —

* **Diálogo UI:** *"Luke, you know this is a once-in-a-lifetime opportunity before it vanishes into the void. I need you to intercept it so we can study it."*

### — Pantalla: Preparar Misión —

* **Diálogo UI:** *"I am putting all available equipment at your disposal. Choose the configuration you consider optimal and good luck—I am certain 3I/Nyx hides a great secret."*

* **Lógica esperada:** Se muestran 3 cartas de naves, 3 de artefactos y las tarjetas de tripulantes. Al pasar el cursor se despliega su descripción. Si el jugador selecciona **Talos-IA**, **Danko** queda asignado automáticamente en el primer espacio y solo queda 1 espacio libre para elegir otro tripulante.

### — Pantalla: Zona de Lanzamiento —

* **Texto UI:** *"Everything is ready to launch the mission."*

* **Lógica esperada:** El jugador presiona el botón de lanzamiento e inicia una cuenta regresiva (`5, 4, 3, 2...`) que abre la ventana del minijuego.

### — Pantalla Minijuego: Calibración de Propulsores —

* **Instrucción UI:** *"Calibrate the thrusters to liftoff."*

* **Escenarios:**

  * **Éxito (Pantalla cohete despegando):** *"Liftoff was a complete success!!"*

  * **Fallo (Ventana de error de sistema con botón `Recalibrate`):** *"Unable to place the rocket into orbit."* *(El minijuego se repite hasta lograr un resultado positivo).*

## 3. Órbita, Extracción y Catástrofe

### — Pantalla Minijuego: Cálculo de Intercepción Orbital (GPS) —

* **Diálogo UI:** *"Woohoo, we're in orbit! Let's find where to intercept our target."*

### — Pantalla: El Cometa (Llegada) —

* **Diálogo UI:** *"We are at the required distance to begin our exploration."*

* **Lógica de variables iniciales y consumo de viaje:**

  * Valores iniciales: `Soporte Vital = 10`, `Energía = 10`, `Integridad = 10`, `Ciencia = 0`.

  * **Gasto de Energía para llegar al cometa:**

    * **Pegaso-I:** `10 -> 8`

    * **Hércules-IV:** `10 -> 7`

    * **Talos-IA:** `10 -> 8`

### — Fase de Extracción de Datos —

* **Minijuego MIS-Lynceus:** *"Identify the frequencies we are looking for."*

* **Minijuego SAL-Phoebus:** *"Let's see those fragments fly."*

* **Minijuego D2C2-Prometheus:** *"Let's get to the bottom of this."*

* **Balance de Extracción:**

| Artefacto | Gasto de Energía | Ciencia Ganada | 
| ----- | ----- | ----- | 
| **MIS-Lynceus** | `x -> x - 1` | `0 -> 2` | 
| **SAL-Phoebus** | `x -> x - 2` | `0 -> 3` | 
| **D2C2-Prometheus** | `x -> x - 3` | `0 -> 5` | 

### — Evento Crítico: La Catástrofe —

* **Diálogo previo UI:** *"Perfect, let's head back and analyze what we found."*

* **Alerta UI:** *"Just as the ship aligns toward Earth, alarms begin to blare..."*

* **Escenario 1: MIS-Lynceus**

  * **Texto UI:** *"Upon synchronizing the spectrometer's frequency, 3I/Nyx's ionized cloud discharged an electric arc across the fuselage. Interstellar dust has clogged external intake vents and misaligned the high-gain antenna. Survive for three days to recalibrate the return vector."*

  * **Daños:**

    * **Pegaso-I:** Integridad `10 -> 8` | Soporte Vital `10 -> 7`

    * **Hércules-IV:** Integridad `10 -> 9` | Soporte Vital `10 -> 9`

    * **Talos-IA:** Integridad `10 -> 9` | Soporte Vital `10 -> 8`

* **Escenario 2: SAL-Phoebus**

  * **Texto UI:** *"The comet retaliates with a violent supersonic cryogenic ejection: a geyser of vapor, radiation, and debris slams directly into the ship's flank, damaging the auxiliary thrusters. Stay alive for 3 days while the escape engines are repaired."*

  * **Daños:**

    * **Pegaso-I:** Integridad `10 -> 6` | Soporte Vital `10 -> 5`

    * **Hércules-IV:** Integridad `10 -> 8` | Soporte Vital `10 -> 7`

    * **Talos-IA:** Integridad `10 -> 7` | Soporte Vital `10 -> 7`

* **Escenario 3: D2C2-Prometheus**

  * **Texto UI:** *"Upon reaching the bottom of the core, the drill struck a dense structure beneath the ice. 3I/Nyx responded with a violent quake that tore away the anchoring harpoons and unleashed an electromagnetic pulse of unknown origin... Can you hold out for 3 days until emergency ignition is ready?"*

  * **Daños:**

    * **Pegaso-I:** Integridad `10 -> 3` | Soporte Vital `10 -> 3`

    * **Hércules-IV:** Integridad `10 -> 6` | Soporte Vital `10 -> 6`

    * **Talos-IA:** Integridad `10 -> 4` | Soporte Vital `10 -> 3`

## 4. Supervivencia: Días 1 a 3 (Eventos Aleatorios)

> **Regla pasiva de Talos-IA:** Si se juega con **Talos-IA**, al final de cada día se suma automáticamente `+1` a `Ciencia` (gracias al análisis de Danko con la IA).

### 1. Día Tranquilo

* **Texto UI:** *"The day passes smoothly; we remain on standby for the return burn."*

* **Efecto:** Sin cambios en las variables.

### 2. Crisis de Estrés en Cabina

* **Texto UI:** *"Stress levels spike, and the crew begins blaming each other for the catastrophe."*

* **Si llevas a Dr. Candy (Resolución automática):**

  * **Texto UI:** *"Dr. Candy kept the situation under control before it could escalate."*

  * **Efecto:** Sin pérdida.

* **Si NO llevas a Dr. Candy:**

  * **Texto UI:** *"The argument escalated out of control; the tension never left the cabin."*

  * **Efecto:** Soporte Vital `x -> x - 2`.

### 3. Fuga de Radiación

* **Texto UI:** *"An air filter collapses, allowing radiation to leak in. Although the bulkhead was sealed in time, one crew member fell ill."*

* **Si llevas a Chem. Jan (Resolución automática):**

  * **Texto UI:** *"Jan quickly synthesized and administered the exact dose to keep the crew member stable until return to Earth."*

  * **Efecto:** Sin pérdida.

* **Si NO llevas a Chem. Jan → Se activa Minijuego: Dosificar Medicamento**

  * **Instrucción UI:** *"Administer the exact dosage of the medication."*

  * **Éxito:** *"You did it—the crew member has stabilized."* (Sin pérdida).

  * **Fallo:** *"The incorrect dosage failed to improve their condition; they will remain isolated from the rest."* → Soporte Vital `x -> x - 2`.

### 4. Fuga de Combustible

* **Texto UI:** *"The control panel gauge shows we are losing fuel from Tank 1."*

* **Si llevas a Eng. Najo (Resolución automática):**

  * **Texto UI:** *"Najo bypassed the fuel line just in time to transfer the remaining fuel into Tank 2."*

  * **Efecto:** Sin pérdida de energía.

* **Si NO llevas a Eng. Najo → Se activa Minijuego: Tubería de Combustible**

  * **Instrucción UI:** *"Hurry up and connect the pipes to save as much fuel as possible."*

  * **Éxito:** *"Excellent, you recovered half of the fuel from the tank."* → Energía `x -> x - 1`.

  * **Fallo:** *"You couldn't complete the connection in time; we'll have to make do with the remaining tank."* → Energía `x -> x - 2`.

### 5. Pérdida de Señal con la Tierra

* **Texto UI:** *"Telemetry error: The high-gain antenna has lost alignment with Earth."*

* **Si llevas a Eng. Danko Y la nave NO es Talos-IA (Resolución automática):**

  * **Texto UI:** *"Danko immediately recalibrated the array and re-established communication with Houston."*

  * **Efecto:** Sin pérdida de energía.

* **Si NO llevas a Danko (o si estás en Talos-IA) → Se activa Minijuego: Telemetría (Unir puntos)**

  * **Instrucción UI:** *"Try to re-establish the connection as quickly as possible."*

  * **Éxito:** *"Excellent, we are back on radar."* (Sin pérdida).

  * **Fallo:** *"Let's launch a micro-probe so ground control can track us again."* → Energía `x -> x - 2`.

### 6. El Dilema Final (Tormenta Magnética)

* **Texto UI:** *"A magnetic storm blocks our exit vector, and the main engines lack the power to burn for home while simultaneously powering the antenna to transmit our findings."*

* **Opción A — No arriesgar (Botón: `Play it Safe`)**

  * **Texto UI:** *"Shutting down transmissions and diverting power to the thrusters."*

  * **Efecto:** Ciencia `x -> x - 4` | Energía `x -> x + 2`.

* **Opción B — Arriesgar (Botón: `Risk It`)**

  * **Texto UI:** *"Sending a massive burst transmission of all gathered data."*

  * **Efecto:** Ciencia `x -> x + 2` | Energía `x -> x - 2`.

## 5. Desenlaces (Endings)

* **Condición 1: Derrota (`Soporte Vital <= 0` o `Energía <= 0` o `Integridad <= 0`)**

  * **Visual:** Pantalla de terminal negra con error `NO SIGNAL — GAME OVER`.

* **Condición 2: Fracaso Profesional (`Ciencia < 5`)**

  * **Visual:** Portada de periódico.

  * **Texto UI:** *"The press begins to question whether giving you command of such a critical mission was a mistake. The data you recovered proved barely useful, and your work fades into obscurity."*

* **Condición 3: Éxito Científico (`Ciencia` entre `5` y `9`)**

  * **Visual:** Portada de revista de divulgación científica.

  * **Texto UI:** *"You are praised by critics for proving your ability to lead an expedition of this magnitude; every major science magazine wants your exclusive report."*

* **Condición 4: Descubrimiento Histórico (`Ciencia >= 10`)**

  * **Visual:** Vitrina iluminada en un museo con la muestra extraída del espacio.

  * **Texto UI:** *"Discovery of the Century: You proved that 3I/Nyx was not what it seemed—confirming we are not alone..."*
