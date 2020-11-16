package my.little.changelog.service.leaf

import my.little.changelog.model.leaf.dto.service.LeafCreationDto
import my.little.changelog.model.leaf.dto.service.LeafDeletionDto
import my.little.changelog.model.leaf.dto.service.LeafReturnedDto
import my.little.changelog.model.leaf.dto.service.LeafUpdateDto
import my.little.changelog.model.leaf.dto.service.toRepoDto
import my.little.changelog.model.leaf.toReturnedDto
import my.little.changelog.persistence.repo.GroupRepo
import my.little.changelog.persistence.repo.LeafRepo
import my.little.changelog.persistence.repo.VersionRepo
import my.little.changelog.validator.Response
import my.little.changelog.validator.VersionValidator
import org.jetbrains.exposed.sql.transactions.transaction

object LeafService {

    fun createLeaf(leaf: LeafCreationDto): Response<LeafReturnedDto> = transaction {
        val version = VersionRepo.findById(leaf.versionId)
        VersionValidator.validateLatest(version)
            .ifValid {
                val group = GroupRepo.findById(leaf.groupId)
                LeafRepo.create(leaf.toRepoDto(version, group)).toReturnedDto()
            }
    }

    fun updateLeaf(leafUpdate: LeafUpdateDto): Response<LeafReturnedDto> = transaction {
        val leaf = LeafRepo.findById(leafUpdate.id)
        val newParentGroup = GroupRepo.findLatestGroupByVid(leafUpdate.parentVid)
        VersionValidator.validateLatest(leaf.version)
            .ifValid {
                leaf.apply {
                    name = leafUpdate.name
                    value = leafUpdate.value
                    valueType = leafUpdate.valueType
                    groupVid = newParentGroup.vid
                }
                LeafRepo.update(leaf).toReturnedDto()
            }
    }

    fun deleteLeaf(leafDeletionDto: LeafDeletionDto): Response<Unit> = transaction {
        val leaf = LeafRepo.findById(leafDeletionDto.id)
        VersionValidator.validateLatest(leaf.version)
            .ifValid {
                LeafRepo.delete(leaf)
            }
    }
}
