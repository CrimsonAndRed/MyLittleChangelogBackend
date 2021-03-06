package my.little.changelog.model.group.dto.external

fun GroupCreationDto.toServiceDto(versionId: Int) = my.little.changelog.model.group.dto.service.GroupCreationDto(
    name = name!!,
    vid = vid,
    parentVid = parentVid,
    versionId = versionId,
)

fun GroupUpdateDto.toServiceDto(groupId: Int) = my.little.changelog.model.group.dto.service.GroupUpdateDto(
    name = name!!,
    parentVid = parentVid,
    id = groupId,
)
