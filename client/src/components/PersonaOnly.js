import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';
import ReactPaginate from 'react-paginate';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PersonaOnly.css';
import './Pagination.css';

function App() {

  const [sociosList, setSocios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState({});

  const [filter, setFilter] = useState('Todos');
  const [sedeFilter, setSedeFilter] = useState('Todos'); // Nuevo estado para el filtro de sede


  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12);


  const toggleModal = () => setModal(!modal);

  const ocultarModalEditar = () => { // New function to close modal
    setModal(false);
  }

  const getSocios = () => {
    Axios.get("http://localhost:3001/registrosocios").then((response) => {
      setSocios(response.data);
    });
  }

  useEffect(() => {
    getSocios();
  }, []);

  const deleteSocio = (ci) => {

    Swal.fire({
      title: "Confirmar eliminado?",
      html: "<i>Esta segura de eliminar <strong>" + ci + "</strong> ? <i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${ci}`).then(() => {
          getSocios();
          Swal.fire({
            icon: "success",
            title: "Socio" + ci + "</strong> ah sido eliminado correctamente <i>",
            timer: 2500
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: "Problemas al eliminar",
            text: 'No se logro eliminar el socio',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Problemas con el servidor" : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSedeFilterChange = (event) => {
    setSedeFilter(event.target.value);
  };

  const filteredSocios = sociosList.filter(socio =>
    (filter === 'Todos' || socio.estado === filter.charAt(0)) &&
    (sedeFilter === 'Todos' || socio.sede === sedeFilter) &&
    (socio.ci.includes(searchTerm) || socio.asociado.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredSocios.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredSocios.length / itemsPerPage);

  const [f_nac, setF_nac] = useState("");
  const [est_civil, setEst_civil] = useState("");
  const [direccion, setDireccion] = useState("");
  const [villa_pobl, setVilla_pobl] = useState("");
  const [comuna, setComuna] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [cel_personal, setCel_personal] = useState("");
  const [ci, setCi] = useState("");
  const [asociado, setAsociado] = useState("");
  const [email, setEmail] = useState("");
  const [razon_social, setRazon_social] = useState("");
  const [empresa_rut_empresa, setEmpresa_rut_empresa] = useState("");

  const [puestoTrabajo, setPuestoTrabajo] = useState(null);

  const editarSocio = (socio) => {
    setF_nac(socio.f_nac)
    setEst_civil(socio.est_civil)
    setDireccion(socio.direccion)
    setVilla_pobl(socio.villa_pobl)
    setComuna(socio.comuna)
    setCiudad(socio.ciudad)
    setRegion(socio.region)
    setCel_personal(socio.cel_personal)
    setCi(socio.ci)
    setAsociado(socio.asociado)
    setEmail(socio.email)
    setRazon_social(socio.razon_social)
    setEmpresa_rut_empresa(socio.empresa_rut_empresa)

    toggleModal();
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const opciones = [
    { value: 'Santiago', label: 'Santiago' },
    { value: 'Concepcion', label: 'Concepcion' },
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

  

  const editar = () => {
    Axios.put("http://localhost:3001/editarPersona", {
      // f_nac: f_nac,
      est_civil: est_civil,
      direccion: direccion,
      villa_pobl: villa_pobl,
      comuna: comuna,
      ciudad: ciudad,
      region: region,
      cel_personal: cel_personal,
      ci: ci,
      asociado: asociado,
      email: email,
      razon_social: razon_social,
      empresa_rut_empresa: empresa_rut_empresa

    }).then(() => {
      getSocios();
      Swal.fire({
        icon: "success",
        title: "Socio Actualizado con exito",
        html: "<i>Socio <strong>" + asociado + "</strong> agregado a la base de datos <i>",
        timer: 3000
      })
      toggleModal();
    }).catch(error => {
      // Manejar errores si es necesario
      console.error("Error al actualizar el socio:", error);
      // Mostrar un mensaje de error
      Swal.fire({
        icon: 'error',
        title: "Error al actualizar el socio",
        text: 'Ocurrió un error al actualizar el socio, por favor intente nuevamente.',
        footer: error.message || 'Error desconocido'
      });
    });
  }

  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
      <body>
        <div>
          <div className="Titulo">
            <h2>LISTA DE SOCIOS</h2>
          </div>

          <div className="search">
            <input type="text" placeholder="Buscar por Rut o Nombre" onChange={handleSearch} />
            <button className="botonBuscar fa fa-search" onClick={getSocios}></button>
          </div>

          <div className="Agregar-socio">
            <Link to="/SociosAgregar">
              <button>AGREGAR</button>
            </Link>
          </div>

          <div className="casillasA">
            <div className="form-checkT form-check-inline">
              <input
                className="form-check-input checkbox-offset"
                type="checkbox"
                id="filtroTodos"
                name="filtro"
                value="Todos"
                checked={filter === 'Todos'}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="filtroTodos">Todos</label>
            </div>
            <div className="form-checkA form-check-inline">
              <input
                className="form-check-input checkbox-offset"
                type="checkbox"
                id="filtroActivo"
                name="filtro"
                value="A"
                checked={filter === 'A'}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="filtroActivo">Activo</label>
            </div>
            <div className="form-checkV form-check-inline">
              <input
                className="form-check-input checkbox-offset"
                type="checkbox"
                id="filtroVigente"
                name="filtro"
                value="V"
                checked={filter === 'V'}
                onChange={handleFilterChange}
              />
              <label className="form-check-label" htmlFor="filtroVigente">Vigente</label>
            </div>
          </div>

          <div className="casillas"> 
            <label htmlFor="sedeFilter">Filtrar por sede:</label>
            <select id="sedeFilter" value={sedeFilter} onChange={handleSedeFilterChange}>
              <option value="Todos">Todos</option>
              <option value="Santiago">Santiago</option>
              <option value="Concepcion">Concepcion</option>
            </select>
          </div>

          <div>
            <table className="TablaSociosPersona">
              <thead>
                <tr>
                  <th>f_nac</th>
                  <th>est_civil</th>
                  <th>direccion</th>
                  <th>villa_pobl</th>
                  <th>comuna</th>
                  <th>ciudad</th>
                  <th>region</th>
                  <th>cel personal</th>
                  <th>ci</th>
                  <th>asociado</th>
                  <th>email</th>
                  <th>razon_social</th>
                  <th>EDITAR</th>
                </tr>
              </thead>
              <tbody>
              {currentItems.map((socio) => (
                  <tr key={socio.ci}>
                    <td>{socio.f_nac}</td>
                    <td>{socio.est_civil}</td>
                    <td>{socio.direccion}</td>
                    <td>{socio.villa_pobl}</td>
                    <td>{socio.comuna}</td>
                    <td>{socio.ciudad}</td>
                    <td>{socio.region}</td>
                    <td>{socio.cel_personal}</td>
                    <td>{socio.ci}</td>
                    <td>{socio.asociado}</td>
                    <td>{socio.email}</td>
                    <td>{socio.razon_social}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          editarSocio(socio);
                        }}
                        className="btn btn-editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button type="button" onClick={() => deleteSocio(socio.ci)} className="btn btn-eliminar">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReactPaginate
              previousLabel={'Anterior'}
              nextLabel={'Siguiente'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={12}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'previous'}
              nextClassName={'next'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </body>

      <Modal isOpen={modal} toggle={toggleModal} className="modal-dialog">
        <ModalHeader toggle={toggleModal}>Editar Socio</ModalHeader>
        <ModalBody>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="f_nac">F Nacimiento</Label>
              <Input
                type="date"
                id="f_nac"
                name="f_nac"
                min="1900-01-01"
                max="2100-12-31"
                value='1990-01-15'
                className="w-full border rounded px-3 py-2"
                readOnly
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="est_civil">Estado Civil</Label>
              <div className="form-check form-switch checkbox-custom">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="est_civil"
                  checked={est_civil === 'C'}
                  onChange={() => setEst_civil(est_civil === 'C' ? 'S' : 'C')}
                />
                <label className="form-check-label" htmlFor="est_civil">
                  {est_civil === 'S' ? 'Soltero' : 'Casado'}
                </label>
              </div>


            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="direccion">Dirección</Label>
              <Input
                onChange={(event) => {
                  setDireccion(event.target.value)
                }}
                type="text"
                id="direccion"
                name="direccion"
                value={direccion}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
          </div>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="villa_pobl">Villa/Población</Label>
              <Input
                onChange={(event) => {
                  setVilla_pobl(event.target.value)
                }}
                type="text"
                id="villa_pobl"
                name="villa_pobl"
                value={villa_pobl}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="comuna">Comuna</Label>
              <Input
                onChange={(event) => {
                  setComuna(event.target.value)
                }}
                type="text"
                id="comuna"
                name="comuna"
                value={comuna}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="ciudad">Ciudad</Label>
              <Input
                onChange={(event) => {
                  setCiudad(event.target.value)
                }}
                type="text"
                id="ciudad"
                name="ciudad"
                value={ciudad}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
          </div>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="region">Región</Label>
              <Input
                onChange={(event) => {
                  setRegion(event.target.value)
                }}
                type="text"
                id="region"
                name="region"
                value={region}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="cel_personal">Celular Personal</Label>
              <Input
                onChange={(event) => {
                  setCel_personal(event.target.value)
                }}
                type="number"
                id="cel_personal"
                name="cel_personal"
                value={cel_personal}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="ci">RUT</Label>
              <Input type="text" id="ci" value={ci} readOnly />
            </FormGroup>
          </div>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="asociado">Asociado</Label>
              <Input
                onChange={(event) => {
                  setAsociado(event.target.value)
                }}
                type="text"
                id="asociado"
                name="asociado"
                value={asociado}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="email">Email</Label>
              <Input
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                type="email"
                id="email"
                name="email"
                value={email}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
          </div>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="razon_social">Razón Social</Label>
              <Input
                onChange={(event) => {
                  setRazon_social(event.target.value)
                }}
                type="text"
                id="razon_social"
                name="razon_social"
                value={razon_social}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="empresa_rut_empresa">Empresa RUT</Label>
              <Input type="text" id="empresa_rut_empresa" value={empresa_rut_empresa} readOnly />
            </FormGroup>
          </div>
        </ModalBody>

        <ModalFooter>
          <button color="primary" onClick={editar} className="botonActualizar botonCeleste m-2" >Actualizar</button>
          <button color="secondary" className="botonActualizar botonRojoSuave m-2" onClick={ocultarModalEditar}>Cancelar</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
