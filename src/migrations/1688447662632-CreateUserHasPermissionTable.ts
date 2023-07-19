import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateUserHasPermissionTable1688447662632
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_has_permissions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
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

    // Add foreign key for the user_id column
    await queryRunner.addColumn(
      "user_has_permissions",
      new TableColumn({
        name: "user_id",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "user_has_permissions",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );

    // Add foreign key for the permission_id column
    await queryRunner.addColumn(
      "user_has_permissions",
      new TableColumn({
        name: "permission_id",
        type: "int",
      })
    );

    await queryRunner.createForeignKey(
      "user_has_permissions",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "permissions",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("user_has_permissions");

    if (table) {
      // Drop foreign key constraints
      const foreignKeyUser = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("user_id") !== -1
      );
      if (foreignKeyUser) {
        await queryRunner.dropForeignKey(
          "user_has_permissions",
          foreignKeyUser
        );
      }

      const foreignKeyPermission = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("permission_id") !== -1
      );
      if (foreignKeyPermission) {
        await queryRunner.dropForeignKey(
          "user_has_permissions",
          foreignKeyPermission
        );
      }

      // Drop columns and table
      await queryRunner.dropColumn("user_has_permissions", "user_id");
      await queryRunner.dropColumn("user_has_permissions", "permission_id");
      await queryRunner.dropTable("user_has_permissions");
    }
  }
}
