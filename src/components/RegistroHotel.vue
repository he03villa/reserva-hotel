<script>
    import saveHotel from '../helpers/getHotel';
    import { useHotelStore } from '../store/hotelStore';
    import { Alert } from '../helpers/services';
    
    export default {
        data() {
            return {
                nombre: '',
                direccion: '',
                pais: '',
                despartamento: '',
                ciudad: '',
                nit: '',
                telefono: ''
            };
        },
        methods: {
            async handleSubmit() {
                const hotelStore = useHotelStore();
                const data = {
                    nombre: this.nombre,
                    direccion: this.direccion,
                    pais: this.pais,
                    despartamento: this.despartamento,
                    ciudad: this.ciudad,
                    nit: this.nit,
                    telefono: this.telefono
                };
                console.log('Nombre:', data);
                const res = await saveHotel(data);
                hotelStore.saveHotel(res.data);
                await Alert('success', '',"El hotel se registro", 'Aceptar');
                this.$router.push('reserva');
            },
        },
    };
</script>
<template>
    <div class="container-formulario">
        <h1>Registro Hotel</h1>
        <form @submit.prevent="handleSubmit">
            <div class="group-input">
                <label for="nombre">Nombre:</label>
                <div>
                    <input type="text" id="nombre" required v-model="nombre" placeholder="Nombre"/>
                </div>
            </div>
            <div class="group-input">
                <label for="correo">Direccion:</label>
                <div>
                    <input type="text" id="direccion" required v-model="direccion" placeholder="Direccion"/>
                </div>
            </div>
            <div class="group-input">
                <label for="correo">Pais:</label>
                <div>
                    <input type="text" id="pais" required v-model="pais" placeholder="Pais"/>
                </div>
            </div>
            <div class="group-input">
                <label for="correo">Departamento:</label>
                <div>
                    <input type="text" id="departamento" required v-model="despartamento" placeholder="Departamento"/>
                </div>
            </div>
            <div class="group-input">
                <label for="correo">Ciudad:</label>
                <div>
                    <input type="text" id="ciudad" required v-model="ciudad" placeholder="Ciudad"/>
                </div>
            </div>
            <div class="group-input">
                <label for="correo">NIT:</label>
                <div>
                    <input type="text" id="nit" required v-model="nit" placeholder="Nit"/>
                </div>
            </div>
            <div class="group-input">
                <label for="correo">Telefono:</label>
                <div>
                    <input type="number" id="telefono" v-model="telefono" placeholder="Telefono"/>
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
    }
</style>