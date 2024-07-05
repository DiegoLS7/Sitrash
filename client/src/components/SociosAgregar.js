import React, { useState, useEffect } from 'react';
import './SociosAgregar.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Select from 'react-select';

function App() {

    const [sociosList, setSocios] = useState([]);
    const [formaPago, setFormaPago] = useState(null);
    const [puestoTrabajo, setPuestoTrabajo] = useState(null);

    const [f_nac, setF_nac] = useState("");
    const [est_civil, setEst_civil] = useState("");
    const [direccion, setDireccion] = useState("");
    const [villa_pobl, setVilla_pobl] = useState("");
    const [comuna, setComuna] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [region, setRegion] = useState("");
    const [cel_personal, setCel_personal] = useState("");
    const [ci, setCi] = useState("");
    const [sede, setSede] = useState("");
    const [estado, setEstado] = useState("");
    const [n_registro, setN_registro] = useState(0);
    const [fecha_inscripcion, setFecha_inscripcion] = useState("");
    const [forma_pago, setForma_pago] = useState("");
    const [mes_desc, setMes_desc] = useState("");
    const [puesto_trabajo, setPuesto_trabajo] = useState("");
    const [asociado, setAsociado] = useState("");
    const [email, setEmail] = useState("");
    const [razon_social, setRazon_social] = useState("");
    const [empresa_rut_empresa, setEmpresa_rut_empresa] = useState("");

    const opciones = [
        { value: 'SANTIAGO', label: 'SANTIAGO' },
        { value: 'CONCEPCION', label: 'CONCEPCION' },
        { value: 'Otro', label: 'Otro' },
    ];

    const forma = [
        { value: 'Tarjeta', label: 'Tarjeta' },
        { value: 'DXP', label: 'DXP' },
        { value: 'Particular', label: 'Particular' },
        { value: 'Otro', label: 'Otro' },
    ];

    const Puesto = [
        { value: 'Conductor', label: 'Conductor' },
        { value: 'Peoneta', label: 'Peoneta' },
        { value: 'Mantencion', label: 'Mantencion' },
        { value: 'Otro', label: 'Otro' },
    ];

    const getSocios = () => {
        Axios.get("http://localhost:3001/registrosocios").then((response) => {
            setSocios(response.data);
            const maxNRegistro = Math.max(...response.data.map(socio => socio.n_registro), 0);
            setN_registro(maxNRegistro + 1);
        });
    }

    useEffect(() => {
        getSocios();
    }, []);

    const handleChangeSede = (selectedOption) => {
        setSede(selectedOption);
    };

    const handleChangeForma = (selectedOption) => {
        setForma_pago(selectedOption);
    };

    const handleChangePuesrto = (selectedOption) => {
        setPuesto_trabajo(selectedOption);
    };

    const add = () => {
        Axios.post("http://localhost:3001/create", {
            f_nac: f_nac,
            est_civil: est_civil,
            direccion: direccion,
            villa_pobl: villa_pobl,
            comuna: comuna,
            ciudad: ciudad,
            region: region,
            cel_personal: cel_personal,
            ci: ci,
            sede: sede.value,
            estado: estado,
            n_registro: n_registro,
            fecha_inscripcion: fecha_inscripcion,
            forma_pago: forma_pago.value,
            mes_desc: mes_desc,
            puesto_trabajo: puesto_trabajo.value,
            asociado: asociado,
            email: email,
            razon_social: razon_social,
            empresa_rut_empresa: empresa_rut_empresa
        }).then(() => {
            getSocios();
            Swal.fire({
                icon: "success",
                title: "Socio registrado con exito",
                html: "<i>Socio <strong>" + asociado + "</strong> agregado a la base de datos <i>",
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
                                Registro de Socio
                            </h2>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form>
                            <h4 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Datos Personales
                            </h4>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password" style={{ marginLeft: '100px' }}>
                                        Fecha nacimiento
                                    </label>
                                    <input
                                        onChange={(event) => { setF_nac(event.target.value); }}
                                        type="date"
                                        id="f_nac"
                                        name="f_nac"
                                        min="1900-01-01"
                                        max="2100-12-31"
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2 mt-4" htmlFor="grid-password" >
                                        Est. Civil
                                    </label>
                                    <div className="form-check form-check-inline" >
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="inlineCheckbox1"
                                            checked={est_civil === 'S'}
                                            onChange={() => setEst_civil(est_civil === 'S' ? "" : 'S')}
                                        />
                                        <label className="form-check-label" htmlFor="inlineCheckbox1">Soltero</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="inlineCheckbox3"
                                            checked={est_civil === 'C'}
                                            onChange={() => setEst_civil(est_civil === 'C' ? "" : 'C')}
                                        />
                                        <label className="form-check-label" htmlFor="inlineCheckbox3">Casado</label>
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Direccion
                                        </label>
                                        <input onChange={(event) => { setDireccion(event.target.value); }} type="text" id="direccion" name="direccion" />
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Poblacion
                                        </label>
                                        <input onChange={(event) => { setVilla_pobl(event.target.value); }} type="text" id="villa_pobl" name="villa_pobl" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Comuna
                                        </label>
                                        <input onChange={(event) => { setComuna(event.target.value); }} type="text" id="comuna" name="comuna" />
                                        <label htmlFor="ciudad">Ciudad:</label>
                                        <input onChange={(event) => { setCiudad(event.target.value); }} type="text" id="ciudad" name="ciudad" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Region
                                        </label>
                                        <input onChange={(event) => { setRegion(event.target.value); }} type="text" id="region" name="region" />
                                        <label htmlFor="cel_personal">Celular:</label>
                                        <input onChange={(event) => { setCel_personal(event.target.value); }} type="number" id="cel_personal" name="cel_personal" />
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h4 className="SubTituloTexto">
                                Datos de Socio
                            </h4>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label htmlFor="ci">Ci:</label>
                                        <input onChange={(event) => { setCi(event.target.value); }} type="text" id="ci" name="ci" />
                                        <label htmlFor="Sede">Sede:</label>
                                        <div className="Select custom-select-container">
                                            <Select
                                                options={opciones}
                                                value={sede}
                                                onChange={handleChangeSede}
                                                placeholder="Seleccione..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3 estado-container">
                                        <label htmlFor="estado">
                                            Estado:
                                        </label>
                                        <div className="estado-checkboxes">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="inlineCheckbox2"
                                                    checked={estado === 'V'}
                                                    onChange={() => setEstado(estado === 'V' ? "" : 'V')}
                                                />
                                                <label className="form-check-label" htmlFor="inlineCheckbox2">Vigente</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="inlineCheckbox4"
                                                    checked={estado === 'A'}
                                                    onChange={() => setEstado(estado === 'A' ? "" : 'A')}
                                                />
                                                <label className="form-check-label" htmlFor="inlineCheckbox4">Antiguo</label>
                                            </div>
                                        </div>
                                        <div className="form-check form-check-inline n-registro-container">
                                            <label htmlFor="n_registro">N#:</label>
                                            <input value={n_registro} onChange={(event) => { setN_registro(event.target.value); }} type="number" id="n_registro" name="n_registro" />
                                        </div>
                                    </div>

                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label htmlFor="fecha_inscripcion">Inscripcion:</label>
                                        <input onChange={(event) => { setFecha_inscripcion(event.target.value); }} type="text" id="fecha_inscripcion" name="fecha_inscripcion" />
                                        <label htmlFor="forma_pago">Forma Pago:</label>
                                        <div className="Select custom-select-container">
                                            <Select
                                                options={forma}
                                                value={forma_pago}
                                                onChange={handleChangeForma}
                                                placeholder="Seleccione..."
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label htmlFor="mes_desc">Desc:</label>
                                        <input onChange={(event) => { setMes_desc(event.target.value); }} type="text" id="mes_desc" name="mes_desc" />
                                        <label htmlFor="puesto_trabajo">Puesto trabajo:</label>
                                        <div className="Select custom-select-container">
                                            <Select
                                                options={Puesto}
                                                value={puesto_trabajo}
                                                onChange={handleChangePuesrto}
                                                placeholder="Seleccione..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h4 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Datos finales
                            </h4>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label htmlFor="asociado">Asociado:</label>
                                    <input onChange={(event) => { setAsociado(event.target.value); }} type="text" id="asociado" name="asociado" />
                                    <label htmlFor="email">Email:</label>
                                    <input onChange={(event) => { setEmail(event.target.value); }} type="text" id="email" name="email" />
                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label htmlFor="razon_social">Razon social:</label>
                                    <input onChange={(event) => { setRazon_social(event.target.value); }} type="text" id="razon_social" name="razon_social" />
                                    <label htmlFor="empresa_rut_empresa">Empresa RUT:</label>
                                    <input onChange={(event) => { setEmpresa_rut_empresa(event.target.value); }} type="text" id="empresa_rut_empresa" name="empresa_rut_empresa" />
                                </div>
                            </div>
                        </form>
                        
                        <div className="FooterBotones">
                            <div className="formAgregar">
                                <Link to="/Socios">
                                    <button className="volverBoton" > Volver</button>
                                </Link> 
                                <input onClick={add} type="submit" value="Agregar Socio" className="addSocio" />
                            </div>
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
