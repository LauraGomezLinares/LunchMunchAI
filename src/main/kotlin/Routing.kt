package com.example

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.contentnegotiation.*

@Serializable
data class Producto(
    val nombre: String,
    val precio: Double
)

@Serializable
data class RespuestaProducto(
    val mensaje: String,
    val producto: Producto
)

// Simulación de base de datos en memoria
val productosGuardados = mutableListOf(
    Producto("Portatil", 1250000.0)
)

fun Application.configureRouting() {

    routing {
        get("/") {
            call.respondText("Bienvenido a la Tienda Online")
        }

        get("/productos") {
            // Retorna toda la lista de productos guardados
            call.respond(productosGuardados)
        }

        post("/producto"){
            val producto = call.receive<Producto>()
            
            // Agrega el nuevo producto a la lista
            productosGuardados.add(producto)

            val respuesta = RespuestaProducto(
                mensaje = "Producto guardado exitosamente",
                producto = producto
            )

            call.respond(respuesta)
        }
    }
}
