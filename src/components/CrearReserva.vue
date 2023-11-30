<script>
    import { useHotelStore } from '../store/hotelStore';
    import { saveRerva, updateRerva } from '../helpers/getReserva';
    import { Alert } from '../helpers/services';
    export default {
        data() {
            return {
                reserva: {
                    id: 0,
                    nombre: '',
                    documento: '',
                    numero_personas: '',
                    fecha_llegada: '',
                    fecha_salida: '',
                    cantidad_noche: '',
                    valor_reserva: '',
                    hotels_id: 0
                }
            }
        },
        methods: {
            mostarReserva() {
                const hotelStore = useHotelStore();
                const { reserva } = hotelStore;
                this.reserva = reserva;
                console.log(this.reserva);
            },
            async handleSubmit() {
                if (this.reserva.cantidad_noche <= 0) {
                    Alert('warning', '',"La fecha de llegada es mayor a la fecha de salida", 'Aceptar');
                    return false;
                }
                console.log(this.reserva);
                if (this.reserva.id == 0) {
                    const res = await saveRerva(this.reserva);
                    /* alert("La reserva se creo"); */
                    await Alert('success', '',"La reserva se creo", 'Aceptar');
                } else {
                    const res = await updateRerva(this.reserva, this.reserva.id);
                    /* alert("La reserva se actualizo"); */
                    await Alert('success', '',"La reserva se actualizo", 'Aceptar');
                }
                this.$router.push('reserva');
            },
            calcularNumeroNoches() {
                if (this.reserva.fecha_llegada != '' && this.reserva.fecha_salida != '') {
                    const fecha1 = new Date(this.reserva.fecha_llegada).getTime();
                    const fecha2 = new Date(this.reserva.fecha_salida).getTime();
                    const diferencia = fecha2 - fecha1;
                    const dia = diferencia / (1000*60*60*24);
                    this.reserva.cantidad_noche = dia;
                }
            }
        },
        mounted() {
            this.mostarReserva();
        }
    }
</script>
<template>
    <div class="container-formulario">
        <h1>Registro Reserva</h1>
        <form @submit.prevent="handleSubmit">
            <div class="group-input">
                <label for="nombre">Nombre:</label>
                <div>
                    <input type="text" id="nombre" required v-model="reserva.nombre" placeholder="Juan Perez"/>
                </div>
            </div>
            <div class="group-input">
                <label for="documento">Documento del huésped:</label>
                <div>
                    <input type="text" id="documento" required v-model="reserva.documento" placeholder="xxxxxxxxx"/>
                </div>
            </div>
            <div class="group-input">
                <label for="numero">Numero de personas:</label>
                <div>
                    <input type="number" id="numero" required v-model="reserva.numero_personas" placeholder="5"/>
                </div>
            </div>
            <div class="group-input">
                <label for="fecha_llegada">Fecha de llegada:</label>
                <div>
                    <input type="date" id="fecha_llegada" required v-model="reserva.fecha_llegada" @change="calcularNumeroNoches()"/>
                </div>
            </div>
            <div class="group-input">
                <label for="fecha_salida">Fecha de salida:</label>
                <div>
                    <input type="date" id="fecha_salida" required v-model="reserva.fecha_salida" @change="calcularNumeroNoches()"/>
                </div>
            </div>
            <div class="group-input">
                <label for="valor">Valor de la reserva:</label>
                <div>
                    <input type="number" id="valor" required v-model="reserva.valor_reserva" placeholder="5000"/>
                </div>
            </div>
    
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<style scoped>
    .container-formulario {
        display: flex;
        justify-content: space-around;
        text-align: center;
        flex-direction: column;
        width: 80vw;
    }

    .container-formulario h1 {
        margin: 15px 0;
    }

    .container-formulario form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .container-formulario form .group-input {
        display: flex;
        flex-direction: column;
        width: 80%;
    }

    .container-formulario form .group-input div {
        border: 1px solid;
        border-radius: 25px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: black;
    }

    .container-formulario form .group-input div input {
        width: 100%;
        border: none;
        font-size: 15px;
        font-weight: normal;
        outline: none;
    }

    .container-formulario form .group-input label {
        font-size: 20px;
        display: flex;
        align-items: baseline;
        color: blue;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container-formulario form .group-input div input:focus-visible {
        outline: none;
    }

    .container-formulario form button {
        border: none;
        width: 80%;
        color: #FFFFFF;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;
        margin: 15px 0;
        padding: 10px;
        background-color: green;
        cursor: pointer;
    }
</style>