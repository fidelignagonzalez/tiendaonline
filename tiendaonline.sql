-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-10-2021 a las 02:16:18
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tiendaonline`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `idarticulo` int(11) NOT NULL,
  `nombre_articulo` varchar(200) NOT NULL,
  `modelo` varchar(200) NOT NULL,
  `marca` varchar(200) NOT NULL,
  `descripcion_articulo` varchar(200) NOT NULL,
  `imagen_articulo` varchar(255) NOT NULL,
  `unidad` varchar(100) NOT NULL,
  `accesorios` varchar(200) NOT NULL,
  `especificaciones` varchar(200) NOT NULL,
  `idusuario` int(11) NOT NULL DEFAULT '1',
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`idarticulo`, `nombre_articulo`, `modelo`, `marca`, `descripcion_articulo`, `imagen_articulo`, `unidad`, `accesorios`, `especificaciones`, `idusuario`, `fecharegistro`) VALUES
(1, 'Portatil', 'ACER1273', 'Acer', 'Portatil', 'portatil.jpg', 'unidad', 'Forro', 'Portatil i5', 1, '2021-10-07 21:49:50'),
(3, 'Mouse', 'M001', 'genius', 'Mouse', 'mouse.jpg', 'unidad', 'nada', 'nadas', 1, '2021-10-11 23:55:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idcarrito` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `session_id` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idcarrito`, `idproducto`, `session_id`, `cantidad`, `fecharegistro`) VALUES
(1, 1, 'ad44fsdffFG221', 12, '2021-10-07 23:16:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL,
  `nombre_categoria` varchar(200) NOT NULL,
  `imagen_categoria` varchar(255) NOT NULL,
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `nombre_categoria`, `imagen_categoria`, `fecharegistro`) VALUES
(1, 'Tecnologia', 'tecnologia.jgp', '2021-10-07 23:13:10'),
(2, 'Electrodomestico', 'Electros', '2021-10-12 07:00:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idcliente` int(11) NOT NULL,
  `tipo_documento` varchar(30) NOT NULL,
  `ndocumento` varchar(50) NOT NULL,
  `nombres` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `telefono` varchar(30) NOT NULL,
  `correo_electronico` varchar(200) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado_cliente` varchar(50) NOT NULL,
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idcliente`, `tipo_documento`, `ndocumento`, `nombres`, `apellidos`, `telefono`, `correo_electronico`, `direccion`, `password`, `estado_cliente`, `fecharegistro`) VALUES
(2, 'Libreta militar', '8838484466', 'jose', 'Manzano', '5676655', 'correo2@hotmail.com', 'calle 332', '1234', 'activo', '2021-10-07 13:39:26'),
(3, 'Cedula', '678754442', 'pedro', 'pedro', '5678976', 'correo@hotmail.com', 'calle 5', '1234', 'activo', '2021-10-07 13:39:26'),
(4, 'Cedula', '47366044', 'ana', 'martinez', '5681297', 'correo@hotmail.com', 'calle 7', '1234', 'activo', '2021-10-07 13:39:26'),
(5, 'Cedula', '26856644', 'juan', 'samches', '5683618', 'correo@hotmail.com', 'calle 9', '1234', 'activo', '2021-10-07 13:39:26'),
(6, 'Cedula', '6347244', 'jesus', 'perez', '5685939', 'correo@hotmail.com', 'calle 11', '1234', 'activo', '2021-10-07 13:39:26'),
(7, 'Cedula', '65423455', 'marcis', 'pera', '5688260', 'correo7@hotmail.com', 'calle 133', '1234', 'activo', '2021-10-07 13:39:26'),
(8, 'Cedula', '124499666', 'maria', 'portillo', '5690581', 'correo@hotmail.com', 'calle 15', '1234', 'activo', '2021-10-07 13:39:26'),
(9, 'Cedula', '183575877', 'perli', 'ddefe', '5692902', 'correo@hotmail.com', 'calle 17', '1234', 'activo', '2021-10-07 13:39:26'),
(10, 'Cedula', '242652088', 'lili', 'rerre', '5695223', 'correo@hotmail.com', 'calle 19', '1234', 'activo', '2021-10-07 13:39:26'),
(11, 'Cedula', '301728299', 'lulu', 'ddefe', '5697544', 'correo@hotmail.com', 'calle 21', '1234', 'activo', '2021-10-07 13:39:26'),
(12, 'Cedula', '360804510', 'lola', 'ryhty', '5699865', 'correo@hotmail.com', 'calle 23', '1234', 'activo', '2021-10-07 13:39:26'),
(13, 'Cedula', '419880721', 'koko', 'ghnhg', '5702186', 'correo@hotmail.com', 'calle 25', '1234', 'activo', '2021-10-07 13:39:26'),
(14, 'Cedula', '478956932', 'lucas', 'asds', '5704507', 'correo@hotmail.com', 'calle 27', '1234', 'activo', '2021-10-07 13:39:26'),
(15, 'Cedula', '538033143', 'sandra', 'ffdg', '5706828', 'correo@hotmail.com', 'calle 29', '1234', 'activo', '2021-10-07 13:39:26'),
(16, 'Cedula', '597109354', 'sarco', 'nhgh', '5709149', 'correo@hotmail.com', 'calle 31', '1234', 'activo', '2021-10-07 13:39:26'),
(17, 'Cedula', '656185565', 'martin', 'martin', '5711470', 'correo@hotmail.com', 'calle 33', '1234', 'activo', '2021-10-07 13:39:26'),
(24, 'cedula', '3423423', 'dfsdf', 'sdf', 'sdfs', 'sdf', 'sdf', '1234', 'Activo', '2021-10-11 23:22:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleorden`
--

CREATE TABLE `detalleorden` (
  `iddetalleorden` int(11) NOT NULL,
  `idorden` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `cantidad` float NOT NULL,
  `valor_producto` double NOT NULL,
  `total_orden` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalleorden`
--

INSERT INTO `detalleorden` (`iddetalleorden`, `idorden`, `idproducto`, `cantidad`, `valor_producto`, `total_orden`) VALUES
(1, 1, 1, 10, 1200000, 12000000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalletransporta`
--

CREATE TABLE `detalletransporta` (
  `iddetalletransporta` int(11) NOT NULL,
  `idtransporta` int(11) NOT NULL,
  `idventa` int(11) NOT NULL,
  `nguia` varchar(200) NOT NULL,
  `peso_envio` int(11) NOT NULL,
  `tipoenvio` varchar(50) NOT NULL,
  `fechahoraenvio` datetime NOT NULL,
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalletransporta`
--

INSERT INTO `detalletransporta` (`iddetalletransporta`, `idtransporta`, `idventa`, `nguia`, `peso_envio`, `tipoenvio`, `fechahoraenvio`, `fecharegistro`) VALUES
(1, 1, 1, 'G-0012', 12, 'Caja', '2021-10-08 00:00:00', '2021-10-08 21:59:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `idmenu` int(11) NOT NULL,
  `ruta_menu` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`idmenu`, `ruta_menu`) VALUES
(1, 'menu1'),
(2, 'menu2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `idorden` int(11) NOT NULL,
  `norden` varchar(50) NOT NULL,
  `idcliente` int(11) NOT NULL,
  `idestado` int(11) NOT NULL,
  `fecha_orden` datetime NOT NULL,
  `total_orden` double NOT NULL,
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `orden`
--

INSERT INTO `orden` (`idorden`, `norden`, `idcliente`, `idestado`, `fecha_orden`, `total_orden`, `fecharegistro`, `idusuario`) VALUES
(1, 'OR-001', 2, 1, '2021-10-07 00:00:00', 1230000, '2021-10-07 23:56:29', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int(11) NOT NULL,
  `idarticulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `idcategoria` int(11) NOT NULL,
  `idtransporta` int(11) NOT NULL,
  `valor_venta` int(11) NOT NULL,
  `estado_producto` int(1) NOT NULL,
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idproducto`, `idarticulo`, `cantidad`, `idcategoria`, `idtransporta`, `valor_venta`, `estado_producto`, `fecharegistro`) VALUES
(1, 1, 12, 1, 1, 1230000, 1, '2021-10-07 23:16:01'),
(4, 3, 12, 2, 1, 1200, 1, '2021-10-12 10:23:42'),
(5, 1, 11, 1, 1, 1000, 1, '2021-10-12 11:28:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idrol` int(11) NOT NULL,
  `nombre_rol` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idrol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'ventas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_permiso`
--

CREATE TABLE `rol_permiso` (
  `idrol_permiso` int(11) NOT NULL,
  `idrol` int(11) NOT NULL,
  `idmenu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol_permiso`
--

INSERT INTO `rol_permiso` (`idrol_permiso`, `idrol`, `idmenu`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--

CREATE TABLE `rol_usuario` (
  `idrol_usuario` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `idrol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol_usuario`
--

INSERT INTO `rol_usuario` (`idrol_usuario`, `idusuario`, `idrol`) VALUES
(1, 1, 1),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transporta`
--

CREATE TABLE `transporta` (
  `idtransporta` int(11) NOT NULL,
  `transportadora` varchar(200) NOT NULL,
  `telefono_transporta` varchar(30) NOT NULL,
  `direccion_transporta` varchar(255) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `fecharegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `transporta`
--

INSERT INTO `transporta` (`idtransporta`, `transportadora`, `telefono_transporta`, `direccion_transporta`, `idusuario`, `fecharegistro`) VALUES
(1, 'Coordinadora', '5675755', 'Calle 2', 1, '2021-10-07 23:15:31'),
(2, 'TCC', '57678789', 'calle 4', 1, '2021-10-12 13:18:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL,
  `nombre_usuario` varchar(200) NOT NULL,
  `login` varchar(200) NOT NULL,
  `passwd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idusuario`, `nombre_usuario`, `login`, `passwd`) VALUES
(1, 'administrador', 'admin', '1234'),
(2, 'administrador ventas', 'ventas', '1234'),
(3, 'Administrador Compras', 'compras', '<a class=\"btnEditar btn btn-primary\">Editar</a><a class=\"btnBorrar btn btn-danger\">Borrar</a>');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`idarticulo`),
  ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idcarrito`),
  ADD KEY `idproducto` (`idproducto`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idcliente`);

--
-- Indices de la tabla `detalleorden`
--
ALTER TABLE `detalleorden`
  ADD PRIMARY KEY (`iddetalleorden`),
  ADD KEY `idorden` (`idorden`),
  ADD KEY `idproducto` (`idproducto`);

--
-- Indices de la tabla `detalletransporta`
--
ALTER TABLE `detalletransporta`
  ADD PRIMARY KEY (`iddetalletransporta`),
  ADD KEY `idtransporta` (`idtransporta`),
  ADD KEY `idventa` (`idventa`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`idmenu`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`idorden`),
  ADD KEY `idcliente` (`idcliente`),
  ADD KEY `idestado` (`idestado`),
  ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `idcategoria` (`idcategoria`),
  ADD KEY `idtransporta` (`idtransporta`),
  ADD KEY `idarticulo` (`idarticulo`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idrol`);

--
-- Indices de la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  ADD PRIMARY KEY (`idrol_permiso`),
  ADD KEY `idrol` (`idrol`),
  ADD KEY `idmenu` (`idmenu`);

--
-- Indices de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD PRIMARY KEY (`idrol_usuario`),
  ADD KEY `idusuario` (`idusuario`),
  ADD KEY `idrol` (`idrol`);

--
-- Indices de la tabla `transporta`
--
ALTER TABLE `transporta`
  ADD PRIMARY KEY (`idtransporta`),
  ADD KEY `idusuario` (`idusuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `idarticulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `idcarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idcliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `detalleorden`
--
ALTER TABLE `detalleorden`
  MODIFY `iddetalleorden` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `detalletransporta`
--
ALTER TABLE `detalletransporta`
  MODIFY `iddetalletransporta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `idmenu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `idorden` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idrol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  MODIFY `idrol_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  MODIFY `idrol_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `transporta`
--
ALTER TABLE `transporta`
  MODIFY `idtransporta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`idproducto`);

--
-- Filtros para la tabla `detalleorden`
--
ALTER TABLE `detalleorden`
  ADD CONSTRAINT `detalleorden_ibfk_1` FOREIGN KEY (`idorden`) REFERENCES `orden` (`idorden`),
  ADD CONSTRAINT `detalleorden_ibfk_2` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`idproducto`);

--
-- Filtros para la tabla `detalletransporta`
--
ALTER TABLE `detalletransporta`
  ADD CONSTRAINT `detalletransporta_ibfk_1` FOREIGN KEY (`idtransporta`) REFERENCES `transporta` (`idtransporta`);

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `orden_ibfk_1` FOREIGN KEY (`idcliente`) REFERENCES `cliente` (`idcliente`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idarticulo`) REFERENCES `articulo` (`idarticulo`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`),
  ADD CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`idtransporta`) REFERENCES `transporta` (`idtransporta`);

--
-- Filtros para la tabla `rol_permiso`
--
ALTER TABLE `rol_permiso`
  ADD CONSTRAINT `rol_permiso_ibfk_1` FOREIGN KEY (`idrol`) REFERENCES `rol` (`idrol`),
  ADD CONSTRAINT `rol_permiso_ibfk_2` FOREIGN KEY (`idmenu`) REFERENCES `menu` (`idmenu`);

--
-- Filtros para la tabla `rol_usuario`
--
ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `rol_usuario_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
