package my.little.changelog.routing.version.group

import io.ktor.application.call
import io.ktor.request.receive
import io.ktor.routing.Routing
import io.ktor.routing.delete
import io.ktor.routing.post
import io.ktor.routing.put
import io.ktor.routing.route
import io.ktor.util.KtorExperimentalAPI
import io.ktor.util.getOrFail
import my.little.changelog.model.group.dto.external.GroupCreationDto
import my.little.changelog.model.group.dto.external.GroupDeletionDto
import my.little.changelog.model.group.dto.external.GroupUpdateDto
import my.little.changelog.model.group.dto.external.toServiceDto
import my.little.changelog.model.group.dto.service.toExternalDto
import my.little.changelog.routing.ofPossiblyEmptyResponse
import my.little.changelog.routing.ofResponse
import my.little.changelog.service.group.GroupService

@KtorExperimentalAPI
fun Routing.groupRouting() {
    route("/version/{versionId}/group") {
        post {
            val versionId = call.parameters.getOrFail("versionId").toInt()
            val dto = call.receive<GroupCreationDto>()

            val resp = GroupService.createGroup(dto.toServiceDto(versionId))
            call.ofResponse(resp.map { it.toExternalDto() })
        }
    }

    route("/version/{versionId}/group/{groupId}") {
        put {
            val groupId = call.parameters.getOrFail("groupId").toInt()
            val dto = call.receive<GroupUpdateDto>()

            val resp = GroupService.updateGroup(dto.toServiceDto(groupId))
            call.ofResponse(resp.map { it.toExternalDto() })
        }

        delete {
            val groupId = call.parameters.getOrFail("groupId").toInt()
            val dropHierarchy = call.request.queryParameters["hierarchy"]?.toBoolean() ?: true
            val returnedGroup = GroupService.deleteGroup(GroupDeletionDto(groupId), dropHierarchy)
            call.ofPossiblyEmptyResponse(returnedGroup.map { it?.toExternalDto() })
        }
    }
}
