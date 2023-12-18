import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '@/layouts/PageLayout';
import LoadingPage from '@/components/pages/LoadingPage';
import { toast } from 'sonner';
import { useSession, signOut } from 'next-auth/react';

function index() {
	const [addNewCommentSection, setAddNewCommentSection] = useState(false);
	const [nuevoEstado, setNuevoEstado] = useState();
	const [comentario, setComentario] = useState();
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [files, setFiles] = useState([]);
	const [consultaId, setConsultaId] = useState();

	const [loading, setLoading] = useState(true);
	const [consulta, setConsulta] = useState();

	const { data: session, status, update } = useSession();
	const router = useRouter();

	if (status === 'loading') {
		return <p>Cargando...</p>;
	}

	const isAuthenticated = session?.user && session.user.role === 'Admin';
	if (typeof window !== 'undefined') {
		if (!isAuthenticated) {
			router.push('/');
		}
	}

	const saveNewComment = async () => {
		try {
			const formData = new FormData();
			let nombre = session.user.nombre;
			let apellido = session.user.apellido;
			let nombreCompleto = nombre + ' ' + apellido;

			formData.append('estado', nuevoEstado);
			formData.append('comentarios', comentario);
			formData.append('responsable', nombreCompleto);
			formData.append('consultaId', consultaId);
			formData.append('tipo', consulta.tipo);

			for (let i = 0; i < files.length; i++) {
				formData.append(`archivos`, files[i]);
			}

			const response = await fetch(
				`/api/consultas/nuevoComentario/${consultaId}`,
				{
					method: 'POST',
					body: formData,
				}
			);

			if (response.ok) {
				toast.success('Nuevo comentario guardado correctamente!');
				router.reload();
			} else {
				response.json().then((errorData) => {
					console.log('Mensaje de error: ' + errorData.error);
				});
			}
		} catch (error) {
			console.error('Error en la solicitud POST:', error);
			// Realizar cualquier acción adicional aquí, como mostrar un mensaje de error
		}
	};

	const handleFilesSelected = async (event) => {
		const files = event.target.files;
		const _files = Array.from(event.target.files);
		console.log(files);
		setFiles(_files);
		const fileNames = Array.from(files).map((file) => file.name);
		setSelectedFiles(fileNames);
	};

	const handleAddNewComment = async (event) => {
		const target = event.target;
		if (addNewCommentSection === false) {
			setAddNewCommentSection(!addNewCommentSection);
		} else {
			saveNewComment();
		}
	};

	const handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		if (name === 'nuevoEstado') {
			setNuevoEstado(value);
		} else if (name === 'comentario') {
			setComentario(value);
		}
	};

	function formatDate(createdAt) {
		if (createdAt !== undefined) {
			const fecha = new Date(
				createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
			);

			// Obtiene los componentes de la fecha (día, mes, año)
			const dia = fecha.getDate();
			const mes = fecha.getMonth() + 1; // Los meses en JavaScript son 0-based (0 = enero)
			const año = fecha.getFullYear();
			const horas = fecha.getHours();
			const minutos = fecha.getMinutes();

			// Formatea la fecha y la hora como DD/MM/AAAA HH:MM
			const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes
				.toString()
				.padStart(2, '0')}/${año} - ${horas
				.toString()
				.padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
			return fechaFormateada;
		}
	}

	useEffect(() => {
		const consultaData = router.query.consultaData;
		setConsultaId(consultaData);
		const getConsulta = async () => {
			const consultaId = consultaData.join('');

			try {
				const response = await fetch(`/api/consultas/detail/${consultaId}`);
				const data = await response.json();
				setConsulta(data.consulta);
				console.log(data.consulta);
			} catch (error) {
				console.log('Error en la solicitud', error);
			} finally {
				setLoading(false);
			}
		};
		if (consultaData !== undefined) {
			getConsulta();
		}
	}, [router]);

	if (loading) return <LoadingPage />;

	if (!consulta) {
		return (
			<PageLayout
				title='Consulta no encontrado'
				className='flex flex-col justify-center items-center gap-4'
			>
				<span>Consulta no encontrado</span>
				<a href='/consultas' className='button-primary bg-secondary text-white'>
					Volver
				</a>
			</PageLayout>
		);
	}

	return (
		<PageLayout title='Consulta'>
			<div className='mt-4 px-4  text-center md:px-8 md:mt-8  lg:px-20 lg:mt-10 md:text-left'>
				<div className='px-8'>
					<h1 className='text-3xl font-semibold'>{consulta.tipo}</h1>
					<br></br>
					<h4 className='text-lg text-titles'>
						Programa de Información y Ordenamiento de la Actividad de
						Administradores de Consorcios de Propiedad Horizontal
					</h4>
				</div>
				<div className='bg-white p-8 rounded-xl mb-8'>
					<h3 className='text-xl font-bold'>Información de la consulta</h3>
					<hr className='my-6 border-gray-500/30' />
					<div encType='multipart/form-data '>
						{/* NOMBRE */}
						{consulta.nombre ? (
							<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Nombre completo</p>
								</div>
								<div className='flex-1 '>
									<div className='flex items-center gap-4'>
										<div className='w-full'>
											<input
												type='text'
												name='nombre'
												value={consulta.nombre}
												className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border deault'
												placeholder='Nombre(s) *'
												readOnly
											/>
										</div>
										<div className='w-full'>
											<input
												type='text'
												name='apellido'
												value={consulta.apellido}
												className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
												placeholder='Apellido(s) *'
												readOnly
											/>
										</div>
									</div>
								</div>
							</div>
						) : null}

						{/* DNI */}
						{consulta.dni ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>DNI</p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='DNI *'
										name='dni'
										value={consulta.dni}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* CUIT */}
						{consulta.cuit ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>CUIT</p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='CUIT *'
										name='cuit'
										value={consulta.cuit}
										readOnly
									/>
								</div>
							</div>
						) : null}
						{/* CUIL */}
						{consulta.cuil ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>CUIL</p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='CUIL *'
										name='cuil'
										value={consulta.cuil}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Sexo */}
						{consulta.sexo ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Sexo </p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										name='sexo'
										value={consulta.sexo}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Razon social */}
						{consulta.razonSocial ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Razón Social</p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Razón Social *'
										name='razonSocial'
										value={consulta.razonSocial}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Representante Legal */}
						{consulta.representanteLegal ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Representante Legal </p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Representante Legal *'
										name='representanteLegal'
										value={consulta.representanteLegal}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Domicilio */}
						{consulta.domicilioCalle ? (
							<div className='flex flex-col gap-y-2 md:flex-row md:items-center mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Domicilio Constituido</p>
								</div>
								<div className='flex-1 '>
									<div className='flex items-center gap-4'>
										<div className='md:w-1/8 w-full'>
											<input
												type='text'
												className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border deault'
												placeholder='Dirección *'
												name='domicilioCalle'
												value={consulta.domicilioCalle}
												readOnly
											/>
										</div>
										<div className='md:w-1/2 w-full '>
											<input
												type='text'
												className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
												placeholder='Número *'
												name='domicilioNumero'
												value={consulta.domicilioNumero}
												readOnly
											/>
										</div>
										{consulta.domicilioPiso ? (
											<div className='md:w-1/2 w-full'>
												<input
													type='text'
													className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
													placeholder='Piso'
													name='domicilioPiso'
													value={consulta.domicilioPiso}
													readOnly
												/>
											</div>
										) : null}
										{consulta.domicilioDpto ? (
											<div className='md:w-1/2 w-full'>
												<input
													type='text'
													className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
													placeholder='Depto'
													name='domicilioDpto'
													value={consulta.domicilioDpto}
													readOnly
												/>
											</div>
										) : null}
									</div>
								</div>
							</div>
						) : null}

						{/* Telefono Celular */}
						{consulta.telefonoCelular ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Teléfono Celular</p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Teléfono celular *'
										name='telefonoCelular'
										value={consulta.telefonoCelular}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Telefono Fijo */}
						{consulta.telefonoFijo ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Teléfono Fijo</p>
								</div>
								<div className='flex-1'>
									<input
										type='text'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Teléfono Fijo'
										name='telefonoFijo'
										value={consulta.telefonoFijo}
										readOnly
									/>
								</div>
							</div>
						) : null}
						{/* Email */}
						{consulta.email ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Email</p>
								</div>
								<div className='flex-1'>
									<input
										type='email'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Email'
										name='email'
										value={consulta.email}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Empresa */}
						{consulta.empresa ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Empresa</p>
								</div>
								<div className='flex-1'>
									<input
										type='email'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Empresa'
										name='empresa'
										value={consulta.empresa}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Hechos */}
						{consulta.hechos ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Hechos</p>
								</div>
								<div className='flex-1'>
									<input
										type='email'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Hechos'
										name='hechos'
										value={consulta.hechos}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Motivo Requerimiento */}
						{consulta.motivoRequerimiento ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Motivo del requerimiento</p>
								</div>
								<div className='flex-1'>
									<input
										type='email'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Motivo Requerimiento'
										name='motivoRequerimiento'
										value={consulta.motivoRequerimiento}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Localidad */}
						{consulta.localidad ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Localidad</p>
								</div>
								<div className='flex-1'>
									<input
										type='email'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='localidad'
										name='localidad'
										value={consulta.localidad}
										readOnly
									/>
								</div>
							</div>
						) : null}
						{/* Partido */}
						{consulta.partido ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Partido</p>
								</div>
								<div className='flex-1'>
									<input
										type='email'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Partido'
										name='partido'
										value={consulta.partido}
										readOnly
									/>
								</div>
							</div>
						) : null}

						{/* Provincia */}
						{consulta.provincia ? (
							<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
								<div className='w-full md:w-1/4'>
									<p>Provincia</p>
								</div>
								<div className='flex-1 '>
									<input
										type='email'
										className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
										placeholder='Provincia'
										name='provincia'
										value={consulta.provincia}
										readOnly
									/>
								</div>
							</div>
						) : null}

						<h3 className='text-xl mt-8 my-6 text-titles'>
							Documentación adjunta
						</h3>
						{/* Documentos */}
						<div className='flex flex-col md:flex-row md:items-center gap-y-2 '>
							<div className='w-full md:w-1/4'>
								<p>Documentos almacenados</p>
							</div>
							<div className='flex-1 '>
								<div>
									{consulta.archivos.map((file) => (
										<div key={file.fileName} className='list-item'>
											<a
												key={file.fileName}
												href={file.downloadURL}
												target='_blank'
												className='text-blue-500 underline'
											>
												{`${file.fileName}\n`}
											</a>
										</div>
									))}
								</div>
							</div>
						</div>
						{/* Documentacion */}
						<hr className='my-6 border-gray-500/30' />
						<h3 className='text-3xl font-semibold mt-8 my-6 text-titles'>
							Proceso
						</h3>
						<hr className='my-6 border-gray-500/30 w-[10%] ' />
						{consulta.estados ? (
							<div>
								{consulta.estados.map((estado) => (
									<div key={estado.createdAt}>
										<MyComponent estado={estado} key={estado.createdAt} />
										<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
											<div className='w-full md:w-1/4'>
												<p>Fecha actualización</p>
											</div>
											<div className='flex-1 '>
												<input
													className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border'
													name='provincia'
													value={formatDate(estado.createdAt)}
													readOnly
												/>
											</div>
										</div>
										<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
											<div className='w-full md:w-1/4'>
												<p>Responsable </p>
											</div>
											<div className='flex-1 '>
												<textarea
													type='text'
													name='responsable'
													className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border h-12'
													value={estado.responsable}
													readOnly
												/>
											</div>
										</div>
										<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
											<div className='w-full md:w-1/4'>
												<p>Comentario </p>
											</div>
											<div className='flex-1 '>
												<textarea
													type='text'
													name='motivoRequerimiento'
													className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border h-18'
													value={estado.comentarios}
													readOnly
												/>
											</div>
										</div>
										{estado.archivos && estado.archivos.length > 0 ? (
											<div className='flex flex-col md:flex-row md:items-center gap-y-2 '>
												<div className='w-full md:w-1/4'>
													<p>Documentos almacenados</p>
												</div>
												<div className='flex-1 '>
													<div>
														{estado.archivos.map((file) => (
															<div key={file.fileName} className='list-item'>
																<a
																	key={file.fileName}
																	href={file.downloadURL}
																	target='_blank'
																	className='text-blue-500 underline'
																>
																	{`${file.fileName}\n`}
																</a>
															</div>
														))}
													</div>
												</div>
											</div>
										) : null}
										<hr className='w-72 h-1 my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700' />
									</div>
								))}
							</div>
						) : null}

						<div className='relative group'>
							{addNewCommentSection && (
								<form onSubmit={saveNewComment} encType='multipart/form-data'>
									{status === 'authenticated' &&
									session.user.role === 'Admin' ? (
										<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
											<div className='w-full md:w-1/4'>
												<p>
													Nuevo Estado <span className='text-red-500'>*</span>
												</p>
											</div>
											<div className='flex-1 '>
												<select
													className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border appearance-none'
													name='nuevoEstado'
													value={nuevoEstado}
													onChange={handleInputChange}
												>
													<option key='pendiente' value='Pendiente de Revisión'>
														Pendiente de Revisión
													</option>

													<option key='En Curso' value='En Curso'>
														En Curso
													</option>

													<option key='Finalizada' value='Finalizada'>
														Finalizada
													</option>

													<option key='Cancelada' value='Cancelada'>
														Cancelada
													</option>
												</select>
											</div>
										</div>
									) : null}

									<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
										<div className='w-full md:w-1/4'>
											<p>
												Comentario <span className='text-red-500'>*</span>
											</p>
										</div>
										<div className='flex-1 '>
											<textarea
												name='comentario'
												type='text'
												className='w-full py-2 px-4 outline-none rounded-lg border-gray-400 border h-24'
												placeholder='Nuevo Comentario'
												onChange={handleInputChange}
											/>
										</div>
									</div>
									<div className='flex flex-col md:flex-row md:items-center gap-y-2 '>
										<div className='w-full md:w-1/4'>
											<p>
												Nuevos Documentos a incluir
											</p>
										</div>
										<div className='flex-1 '>
											<div>
												<input
													type='file'
													id='archivos'
													name='archivos'
													className='hidden md:w-1/2'
													multiple
													onChange={handleFilesSelected}
												/>
												<label
													htmlFor='archivos'
													className='w-full md:w-1/2 flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white  leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out'
												>
													Seleccionar documentos
												</label>
											</div>

											<div
												id='lista-archivos'
												className='flex  flex-wrap gap-2 text-gray-400 text-sm mt-4'
											>
												{selectedFiles.map((fileName, index) => (
													<React.Fragment key={fileName}>
														{index > 0 &&
															index < selectedFiles.length - 1 &&
															'-'}
														<span>{fileName}</span>
													</React.Fragment>
												))}
											</div>
										</div>
									</div>
								</form>
							)}
						</div>
						<div className='flex justify-end'>
							<button
								className='bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors'
								onClick={handleAddNewComment}
							>
								Agregar nuevo comentario
							</button>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}

export default index;

const MyComponent = ({ estado }) => {
	let textColor;
	switch (estado.estado) {
		case 'Pendiente de Revisión':
			textColor = 'text-yellow-500';
			break;
		case 'En Curso':
			textColor = 'text-blue-500';
			break;
		case 'Finalizada':
			textColor = 'text-green-500';
			break;
		case 'Cancelada':
			textColor = 'text-pink-500';
			break;
	}

	return (
		<div className='flex flex-col md:flex-row md:items-center gap-y-2 mb-6'>
			<div className='w-full md:w-1/4'>
				<p>Estado</p>
			</div>
			<div className={`flex-1  ${textColor}`}>
				<input
					className={`w-full py-2 px-4 outline-none rounded-lg border-gray-400 border`}
					name='provincia'
					value={estado.estado}
					readOnly
				/>
			</div>
		</div>
	);
};
