import React, { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import './EmpresaAgregar.css';

function App() {

    const [EmpresasList, setEmpresas] = useState([]);

    const getEmpresas = () => {
        Axios.get("http://localhost:3001/empresas").then((response) => {
            setEmpresas(response.data);
        });
    }

    useEffect(() => {
        getEmpresas();
      }, []);

    const [RAZON_SOCIAL, setRazon_social] = useState("");
    const [RUT_EMPRESA, setRut_empresa] = useState("");
    const [FONO, setFono] = useState("");
    const [CORREO_ELECTRONICO, setCorreo_electronico] = useState("");
    const [REPRESENTANTE_LEGAL, setRepresentante_legal] = useState("");
    const [CI_REPRESENTANTE, setCi_representante] = useState("");
    const [COMUNA_RAZON, setComuna_razon] = useState("");
    const [DIRECCION_RAZON, setDireccion_razon] = useState("");
    const [CIUDAD_RAZON, setCiudad_razon] = useState("");
    const [REGION_RAZON, setRegion_razon] = useState("");

    const add = () => {
        Axios.post("http://localhost:3001/crear", {
            RAZON_SOCIAL: RAZON_SOCIAL,
            RUT_EMPRESA: RUT_EMPRESA,
            FONO: FONO,
            CORREO_ELECTRONICO: CORREO_ELECTRONICO,
            REPRESENTANTE_LEGAL: REPRESENTANTE_LEGAL,
            CI_REPRESENTANTE: CI_REPRESENTANTE,
            COMUNA_RAZON: COMUNA_RAZON,
            DIRECCION_RAZON: DIRECCION_RAZON,
            CIUDAD_RAZON: CIUDAD_RAZON,
            REGION_RAZON: REGION_RAZON
        }).then(() => {
            getEmpresas();
            Swal.fire({
                icon: "success",
                title: "Socio registrado con exito",
                html: "<i>Socio <strong>" + RAZON_SOCIAL + "</strong> agregado a la base de datos <i>",
                timer: 3000
            })
        })

    }
    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h2 className="text-blueGray-700 text-xl font-bold">
                                Registro de Empresas
                            </h2>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h4 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Datos de Empresa
                            </h4>
                            <div class="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"  >
                                        Razon Social
                                    </label>
                                    <input onChange={(event) => { setRazon_social(event.target.value); }} type="text" id="razon_social" name="razon_social" />

                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password" >
                                        Rut
                                    </label>
                                    <div className="form-check form-check-inline" >
                                        <input onChange={(event) => { setRut_empresa(event.target.value); }} type="text" id="rut_empresa" name="rut_empresa"/>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Fono
                                        </label>
                                        <input onChange={(event) => { setFono(event.target.value); }} type="number" id="Fono" name="Fono" />
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Correo 
                                        </label>
                                        <input onChange={(event) => { setCorreo_electronico(event.target.value); }} type="text" id="Correo_electronico" name="Correo_electronico" />
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Repre. legal
                                        </label>
                                        <input onChange={(event) => { setRepresentante_legal(event.target.value); }} type="text" id="representante_legal" name="representante_legal" />
                                        <label htmlFor="ci_representante">Ci Repre. :</label>
                                        <input onChange={(event) => { setCi_representante(event.target.value); }} type="text" id="ci_representante" name="ci_representante" />
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Comuna 
                                        </label>
                                        <input onChange={(event) => { setComuna_razon(event.target.value); }} type="text" id="comuna_razon" name="comuna_razon" />

                                        <label htmlFor="direccion_razon">Direccion:</label>
                                        <input onChange={(event) => { setDireccion_razon(event.target.value); }} type="text" id="direccion_razon" name="direccion_razon" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-12/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <label htmlFor="ciudad_razon">Ciudad :</label>
                                        <input onChange={(event) => { setCiudad_razon(event.target.value); }} type="text" id="ciudad_razon" name="ciudad_razon" />

                                        <label htmlFor="region_razon">Region :</label>
                                        <input onChange={(event) => { setRegion_razon(event.target.value); }} type="text" id="region_razon" name="region_razon" />
                                    </div>
                                </div>
                            </div>
                              
                        </form>
                        <div className="formAgregar">
                            <input onClick={add} type="submit" value="Agregar Empresa" className="addSocio" />
                        </div>

                    </div>
                </div>
                <footer>
                <p><a></a></p>
                <p>Sitio web mantenido por Diego León</p>
                <p><a href="mailto:diegoleonsandoval@gmail.com">diegoleonsandoval@gmail.com</a></p>
                <p>&copy; 2024 Sitrash - Sistema Mantenedor</p>
            </footer>
            </div>
        </section>

    );
}

export default App;
