<script>
    import { useHotelStore } from '../store/hotelStore';
    import { getAllReservas, updateStado } from '../helpers/getReserva';

    export default {
        data() {
            return {
                hotel: undefined,
                arrayReservas: [],
                dialog: false,
                reserva: undefined,
                filtro: {
                    id: '',
                    fecha: '',
                    nombre: ''
                }
            }
        },
        methods: {
            mostarHotel() {
                const hotelStore = useHotelStore();
                const { hotel } = hotelStore;
                this.hotel = hotel;
                console.log(this.hotel);
            },
            async mostrarReservas() {
                const res = await getAllReservas(this.hotel.id);
                this.arrayReservas = res.data;
                console.log(this.arrayReservas);
            },
            async cambiarStado(item, stado) {
                const data = { estado_reserva: stado };
                const res = await updateStado(data, item.id);
                item = {...item, ...res.data};
                const post = this.arrayReservas.findIndex(f => f.id == item.id);
                this.arrayReservas[post] = item;
                console.log(item);
            },
            verReserva(item) {
                console.log(item);
                this.dialog = true;
                this.reserva = item;
            },
            editarReserva(item) {
                console.log(item);
                const data = {
                    id: item.id,
                    nombre: item.nombre,
                    documento: item.documento,
                    numero_personas: item.numero_personas,
                    fecha_llegada: item.fecha_llegada,
                    fecha_salida: item.fecha_salida,
                    cantidad_noche: item.cantidad_noche,
                    valor_reserva: item.cantidad_noche
                }
                this.irCrearReserva(data);
            },
            crearReserva() {
                const data = {
                    id: 0,
                    nombre: '',
                    documento: '',
                    numero_personas: '',
                    fecha_llegada: '',
                    fecha_salida: '',
                    cantidad_noche: '',
                    valor_reserva: '',
                    hotels_id: this.hotel.id
                }
                this.irCrearReserva(data);
            },
            irCrearReserva(item) {
                const hotelStore = useHotelStore();
                hotelStore.getReserva(item);
                this.$router.push('crear-reserva');
            },
            async filtrar() {
                const res = await getAllReservas(this.hotel.id, this.filtro.id, this.filtro.fecha, this.filtro.nombre);
                this.arrayReservas = res.data;
            },
            limpiar() {
                this.filtro = {
                    id: '',
                    fecha: '',
                    nombre: ''
                };
                this.mostrarReservas();
            }
        },
        mounted() {
            this.mostarHotel();
            this.mostrarReservas();
        }
    }
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h1>Lista de reservas</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div>
                    <v-btn @click="crearReserva()" color="primary">Crear Reserva</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="container-lista">
                    <div class="container-filtro">
                        <div class="filtro">
                            <div class="filtro-form">
                                <div class="group-input">
                                    <label for="id">Id:</label>
                                    <div>
                                        <input type="text" id="id" required v-model="filtro.id" placeholder="ID"/>
                                    </div>
                                </div>
                                <div class="group-input">
                                    <label for="fecha">Fecha de llegada:</label>
                                    <div>
                                        <input type="date" id="fecha" required v-model="filtro.fecha"/>
                                    </div>
                                </div>
                                <div class="group-input">
                                    <label for="fecha">Nombre o documento del huésped:</label>
                                    <div>
                                        <input type="text" id="fecha" required v-model="filtro.nombre" placeholder="Nombre o Documento"/>
                                    </div>
                                </div>
                                <div class="conten-btn">
                                    <button @click="filtrar()">Buscar</button>
                                    <button @click="limpiar()">Limpiar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-tabla">
                        <v-table class="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre del cliente</th>
                                    <th>Documento del cliente</th>
                                    <th>fecha de llegada</th>
                                    <th>fecha de salida</th>
                                    <th>Valor de la reserva</th>
                                    <th>Numero de noches</th>
                                    <th>cantidad de huéspedes</th>
                                    <th>estado de la reserva</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in arrayReservas" :key="item.id">
                                    <td>{{ item.id }}</td>
                                    <td>{{ item.nombre }}</td>
                                    <td>{{ item.documento }}</td>
                                    <td>{{ item.fecha_llegada }}</td>
                                    <td>{{ item.fecha_salida }}</td>
                                    <td>{{ item.valor_reserva }}</td>
                                    <td>{{ item.cantidad_noche }}</td>
                                    <td>{{ item.numero_personas }}</td>
                                    <td class="capitalize">{{ item.estado_reserva }}</td>
                                    <td class="content-btn">
                                        <!-- <button>Editar</button> -->
                                        <!-- <button>Canselar</button> -->
                                        <!-- <button>Confirmar</button> -->
                                        <!-- <button>Ver</button> -->
                                        <i @click="editarReserva(item)" class="fa-regular fa-pen-to-square"></i>
                                        <i class="fa-solid fa-rectangle-xmark rojo" @click="cambiarStado(item, 'cancelada')"></i>
                                        <i v-if="item.estado_reserva == 'provisional'" @click="cambiarStado(item, 'confirmada')" class="fa-regular fa-circle-check verde"></i>
                                        <i v-if="item.estado_reserva == 'confirmada'" @click="cambiarStado(item, 'provisional')" class="fa-regular fa-hand orange"></i>
                                        <i @click="verReserva(item)" class="fa-solid fa-eye"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <v-card-text class="modal-body">
                <label>Nombre del cliente {{ reserva.nombre }}</label>
                <label>Documento del cliente {{ reserva.documento }}</label>
                <label>fecha de llegada {{ reserva.fecha_llegada }}</label>
                <label>fecha de salida {{ reserva.fecha_salida }}</label>
                <label>Valor de la reserva {{ reserva.valor_reserva }}</label>
                <label>Numero de noches {{ reserva.cantidad_noche }}</label>
                <label>cantidad de huéspedes {{ reserva.numero_personas }}</label>
                <label>estado de la reserva {{ reserva.estado_reserva }}</label>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>

    h1 {
        text-align: center;
        font-size: 30px;
    }
    .container-lista {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }

    .container-filtro, .container-tabla {
        margin: 0 15px;
    }
    .container-lista .container-filtro .filtro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        border: 1px solid gray;
        padding: 14px;
        border-radius: 18px;
    }

    .container-lista .container-filtro .filtro .filtro-form .group-input {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .container-lista .container-filtro .filtro .filtro-form .group-input div {
        border: 1px solid;
        border-radius: 25px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: black;
    }

    .container-lista .container-filtro .filtro .filtro-form .group-input div input {
        width: 100%;
        border: none;
        font-size: 15px;
        font-weight: normal;
        outline: none;
    }

    .container-lista .container-filtro .filtro .filtro-form .group-input label {
        font-size: 12px;
        display: flex;
        align-items: baseline;
        color: blue;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container-lista .container-filtro .filtro .filtro-form .group-input div input:focus-visible {
        outline: none;
    }

    .container-lista .container-filtro .filtro .filtro-form .conten-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .container-lista .container-filtro .filtro .filtro-form .conten-btn button {
        border: none;
        width: 100%;
        color: #FFFFFF;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;
        margin: 6px 0;
        padding: 10px;
        background-color: green;
    }
    
    .table {
        width: 70vw;
    }

    .table thead tr th, table tbody tr td {
        text-align: center;
    }

    .table thead tr {
        background-color: blue;
    }

    .table thead tr th {
        color: white;
    }

    .content-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .content-btn i {
        font-size: 20px;
        padding: 0 5px;
        cursor: pointer;
    }

    .capitalize {
        text-transform: capitalize;
    }

    .rojo {
        color: red;
    }

    .verde {
        color: green;
    }

    .orange {
        color: orange;
    }

    .modal-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: baseline;
    }
</style>