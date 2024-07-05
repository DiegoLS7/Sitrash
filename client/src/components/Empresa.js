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
import './Empresa.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pagination.css';

function App() {

  const [empresasList, setEmpresas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState({});

  const [filter, setFilter] = useState('Todos');

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12);


  const toggleModal = () => setModal(!modal);

  const ocultarModalEditar = () => { // New function to close modal
    setModal(false);
  }

  const getEmpresas = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/empresas");
      setEmpresas(response.data);
    } catch (error) {
      console.error("Error fetching empresas:", error);
      Swal.fire({
        icon: 'error',
        title: "Error al obtener empresas",
        text: 'Ocurrió un error al obtener la lista de empresas, por favor intente nuevamente.',
        footer: error.message || 'Error desconocido'
      });
    }
  };
  
  useEffect(() => {
    getEmpresas();
  }, []);

  const deleteEmpresa = (RUT_EMPRESA) => {

    Swal.fire({
      title: "Confirmar eliminado?",
      html: "<i>Esta segura de eliminar <strong>" + RUT_EMPRESA + "</strong> ? <i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${RUT_EMPRESA}`).then(() => {
          getEmpresas();
          Swal.fire({
            icon: "success",
            title: "Empresa" + RUT_EMPRESA + "</strong> ah sido eliminado correctamente <i>",
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

  const filteredEmpresas = empresasList.filter(empresas =>
    (empresas.RUT_EMPRESA.includes(searchTerm) || empresas.RAZON_SOCIAL.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredEmpresas.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredEmpresas.length / itemsPerPage);

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

  const editarEmpresa = (empresa) => {
    setRazon_social(empresa.RAZON_SOCIAL)
    setRut_empresa(empresa.RUT_EMPRESA)
    setFono(empresa.FONO)
    setCorreo_electronico(empresa.CORREO_ELECTRONICO)
    setRepresentante_legal(empresa.REPRESENTANTE_LEGAL)
    setCi_representante(empresa.CI_REPRESENTANTE)
    setComuna_razon(empresa.COMUNA_RAZON)
    setDireccion_razon(empresa.DIRECCION_RAZON)
    setCiudad_razon(empresa.CIUDAD_RAZON)
    setRegion_razon(empresa.REGION_RAZON)
    toggleModal();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmpresa(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const editar = () => {
    Axios.put("http://localhost:3001/editarEmpresa", {
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
        title: "Socio Actualizado con exito",
        html: "<i>Socio <strong>" + RAZON_SOCIAL + "</strong> agregado a la base de datos <i>",
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700,900"></link>
      <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;700&display=swap" rel="stylesheet"></link>


      <body>
        <div>
          <div className="titulo">
            <h2>LISTA DE EMPRESAS</h2>
          </div>

          <div className="search">
            <input type="text" placeholder="Buscar por RUT o RAZON" onChange={handleSearch} />
            <button className="botonBuscar fa fa-search" onClick={getEmpresas}></button>
          </div>

          <div className="AgregarEmpresa">
            <Link to="/EmpresaAgregar">
              <button className='botonAgregarEmpresa fa fa-plus' aria-hidden="true"> NUEVO</button>
            </Link>
          </div>

          <div>
            <table className="TablaEmpresas">
              <thead>
                <tr>
                  <th>RAZON SOCIAL</th>
                  <th>RUT EMPRESA</th>
                  <th>FONO</th>
                  <th>CORREO ELECTRONICO</th>
                  <th>REPRESENTANTE LEGAL</th>
                  <th>CI REPRESENTANTE</th>
                  <th>COMUNA RAZON</th>
                  <th>DIRECCION RAZON</th>
                  <th>CIUDAD RAZON</th>
                  <th>REGION RAZON</th>
                  <th>EDITAR</th>
                </tr>
              </thead>
              <tbody>
              {currentItems.map((empresa) => (
                  <tr key={empresa.RUT_EMPRESA}>
                    <td>{empresa.RAZON_SOCIAL}</td>
                    <td>{empresa.RUT_EMPRESA}</td>
                    <td>{empresa.FONO}</td>
                    <td>{empresa.CORREO_ELECTRONICO}</td>
                    <td>{empresa.REPRESENTANTE_LEGAL}</td>
                    <td>{empresa.CI_REPRESENTANTE}</td>
                    <td>{empresa.COMUNA_RAZON}</td>
                    <td>{empresa.DIRECCION_RAZON}</td>
                    <td>{empresa.CIUDAD_RAZON}</td>
                    <td>{empresa.REGION_RAZON}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          editarEmpresa(empresa);
                        }}
                        className="btn btn-editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button type="button" onClick={() => deleteEmpresa(empresa.RUT_EMPRESA)} className="btn btn-eliminar">
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
        <ModalHeader toggle={toggleModal}>Editar Empresa</ModalHeader>
        <ModalBody>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="RAZON_SOCIAL">R Social</Label>
              <Input
                onChange={(event) => {
                  setRazon_social(event.target.value)
                }}
                type="text"
                id="RAZON_SOCIAL"
                name="RAZON_SOCIAL"
                value={RAZON_SOCIAL}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="RUT_EMPRESA">Rut Empresa</Label>
              <div className="form-check form-switch checkbox-custom">
              <Input
                onChange={(event) => {
                  setRut_empresa(event.target.value)
                }}
                type="text"
                id="RUT_EMPRESA"
                name="RUT_EMPRESA"
                value={RUT_EMPRESA}
                className="w-full border rounded px-3 py-2"
              />
              </div>
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="FONO">Fono</Label>
              <Input
                onChange={(event) => {
                  setDireccion_razon(event.target.value)
                }}
                type="number"
                id="FONO"
                name="FONO"
                value={FONO}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
          </div>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="CORREO_ELECTRONICO">Correo</Label>
              <Input
                onChange={(event) => {
                  setCorreo_electronico(event.target.value)
                }}
                type="text"
                id="CORREO_ELECTRONICO"
                name="CORREO_ELECTRONICO"
                value={CORREO_ELECTRONICO}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="REPRESENTANTE_LEGAL">Representante</Label>
              <Input
                onChange={(event) => {
                  setRepresentante_legal(event.target.value)
                }}
                type="text"
                id="REPRESENTANTE_LEGAL"
                name="REPRESENTANTE_LEGAL"
                value={REPRESENTANTE_LEGAL}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="CI_REPRESENTANTE">Ci Repre.</Label>
              <Input
                onChange={(event) => {
                  setCi_representante(event.target.value)
                }}
                type="text"
                id="CI_REPRESENTANTE"
                name="CI_REPRESENTANTE"
                value={CI_REPRESENTANTE}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
          </div>
          <div className="socio-info">
            <FormGroup className="col-md-4">
              <Label for="COMUNA_RAZON">Comuna</Label>
              <Input
                onChange={(event) => {
                  setComuna_razon(event.target.value)
                }}
                type="text"
                id="COMUNA_RAZON"
                name="COMUNA_RAZON"
                value={COMUNA_RAZON}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="DIRECCION_RAZON">Direccion</Label>
              <Input
                onChange={(event) => {
                  setDireccion_razon(event.target.value)
                }}
                type="text"
                id="DIRECCION_RAZON"
                name="DIRECCION_RAZON"
                value={DIRECCION_RAZON}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="CIUDAD_RAZON">Region</Label>
              <Input
                onChange={(event) => {
                  setRegion_razon(event.target.value)
                }}
                type="text"
                id="CIUDAD_RAZON"
                name="CIUDAD_RAZON"
                value={CIUDAD_RAZON}
                className="w-full border rounded px-3 py-2"
              />
            </FormGroup>
            <FormGroup className="col-md-4">
              <Label for="REGION_RAZON">Region</Label>
              <Input
                onChange={(event) => {
                  setRegion_razon(event.target.value)
                }}
                type="text"
                id="REGION_RAZON"
                name="REGION_RAZON"
                value={REGION_RAZON}
                className="w-full border rounded px-3 py-2"
              />
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
