package my.little.changelog.routing

import io.ktor.config.MapApplicationConfig
import io.ktor.server.testing.TestApplicationEngine
import io.ktor.server.testing.withTestApplication
import io.ktor.util.KtorExperimentalAPI
import my.little.changelog.model.group.Group
import my.little.changelog.model.leaf.Leaf
import my.little.changelog.model.leaf.LeafType
import my.little.changelog.model.version.Version
import org.jetbrains.exposed.sql.Transaction
import org.testcontainers.containers.PostgreSQLContainer
import org.testcontainers.junit.jupiter.Testcontainers
import my.little.changelog.module as applicationModule
import my.little.changelog.persistence.module as persistenceModule
import my.little.changelog.routing.module as routingModule

@KtorExperimentalAPI
@Testcontainers
abstract class AbstractIntegrationTest {

    protected fun testApplication(test: TestApplicationEngine.() -> Unit) {
        val postgres = PostgreSQLContainer<Nothing>("postgres:13").apply {
            start()
        }

        withTestApplication(
            {
                (environment.config as MapApplicationConfig).apply {
                    put("database.url", postgres.jdbcUrl)
                    put("database.username", postgres.username)
                    put("database.password", postgres.password)
                }
                applicationModule(testing = true)
                routingModule()
                persistenceModule()
            },
            test
        )
    }

    protected fun Transaction.createVersion(): Version = Version
        .new { }.also { commit() }

    protected fun Transaction.createGroup(version: Version, parentVid: Int? = null, name: String = "Test Group"): Group = Group
        .new {
            this.version = version
            this.parentVid = parentVid
            this.name = name
        }.also { commit() }

    protected fun Transaction.createLeaf(version: Version, groupVid: Int, name: String = "Test Leaf", valueType: Int = LeafType.TEXTUAL.id, value: String = "Test Value"): Leaf = Leaf
        .new {
            this.version = version
            this.groupVid = groupVid
            this.name = name
            this.valueType = valueType
            this.value = value
        }.also { commit() }
}
