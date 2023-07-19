import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateRoleHasPermissionTable1688446902275
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role_has_permissions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "role_id",
            type: "int",
          },
          {
            name: "permission_id",
            type: "int",
          },
        ],
      }),
      true
    );

    // Add foreign key for the role_id column
    await queryRunner.addColumn(
      "role_has_permissions",
      new TableColumn({
        name: "role_id",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "role_has_permissions",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "CASCADE",
      })
    );

    // Add foreign key for the permission_id column
    await queryRunner.addColumn(
      "role_has_permissions",
      new TableColumn({
        name: "permission_id",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "role_has_permissions",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "permissions",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("role_has_permissions");
    if (table) {
      // Drop foreign key constraints
      const foreignKeyRole = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("role_id") !== -1
      );
      if (foreignKeyRole) {
        await queryRunner.dropForeignKey(
          "role_has_permissions",
          foreignKeyRole
        );
      }

      const foreignKeyPermission = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("permission_id") !== -1
      );
      if (foreignKeyPermission) {
        await queryRunner.dropForeignKey(
          "role_has_permissions",
          foreignKeyPermission
        );
      }

      // Drop columns and table
      await queryRunner.dropColumn("role_has_permissions", "role_id");
      await queryRunner.dropColumn("role_has_permissions", "permission_id");
      await queryRunner.dropTable("role_has_permissions");
    }
  }
}
