import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

group = "my.little"
version = "0.0.1"

repositories {
    jcenter()
    mavenCentral()
}

application {
    mainClassName = "io.ktor.server.netty.EngineMain"
}

plugins {
    application
//    jacoco
    kotlin("jvm")
    id("com.github.johnrengelman.shadow")
    id("org.jlleitschuh.gradle.ktlint")
}

val ktorVersion = "1.4.0"
val logbackVersion = "1.2.3"
val exposedVersion = "0.24.1"
val hikariVersion = "3.4.5"
val postgresVersion = "42.2.16"
val flywayVersion = "6.5.5"

dependencies {
    implementation("io.ktor","ktor-server-netty", ktorVersion)
    implementation("io.ktor","ktor-auth-jwt", ktorVersion)
    implementation("io.ktor","ktor-jackson", ktorVersion)
    implementation("io.ktor","ktor-server-sessions", ktorVersion)
    implementation("ch.qos.logback","logback-classic", logbackVersion)

    // Database
    implementation("org.jetbrains.exposed", "exposed-core", exposedVersion)
    implementation("org.jetbrains.exposed", "exposed-dao", exposedVersion)
    implementation("org.jetbrains.exposed", "exposed-jdbc", exposedVersion)
    implementation("com.zaxxer", "HikariCP", hikariVersion)
    implementation("org.flywaydb", "flyway-core", flywayVersion)
    runtimeOnly("org.postgresql", "postgresql", postgresVersion)

    testImplementation("io.ktor:ktor-server-tests:$ktorVersion")
}

tasks {
    withType<KotlinCompile> {
        kotlinOptions {
            jvmTarget = "14"
            freeCompilerArgs = listOf("-Xjsr305=strict")
        }
    }
    shadowJar {
        archiveVersion.set("")
    }
//    jacocoTestCoverageVerification {
//        violationRules {
//            rule {
//                limit {
//                    minimum = "0.75".toBigDecimal()
//                }
//            }
//        }
//    }
}

tasks.test {
    useJUnitPlatform()
    testLogging {
        events ("passed", "skipped", "failed")
    }
}