import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateUserHasRolesTable1688447775823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'user_has_roles',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'user_id',
                type: 'int',
              },
              {
                name: 'role_id',
                type: 'int',
              },
            ],
          }),
          true
        );
    
        // Add foreign key for the user_id column
        await queryRunner.addColumn(
          'user_has_roles',
          new TableColumn({
            name: 'user_id',
            type: 'int',
          })
        );
    
        await queryRunner.createForeignKey(
          'user_has_roles',
          new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
          })
        );
    
        // Add foreign key for the role_id column
        await queryRunner.addColumn(
          'user_has_roles',
          new TableColumn({
            name: 'role_id',
            type: 'int',
          })
        );
    
        await queryRunner.createForeignKey(
          'user_has_roles',
          new TableForeignKey({
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'roles',
            onDelete: 'CASCADE',
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('user_has_roles');
    
        if (table) {
          // Drop foreign key constraints
          const foreignKeyUser = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
          if (foreignKeyUser) {
            await queryRunner.dropForeignKey('user_has_roles', foreignKeyUser);
          }
    
          const foreignKeyRole = table.foreignKeys.find((fk) => fk.columnNames.indexOf('role_id') !== -1);
          if (foreignKeyRole) {
            await queryRunner.dropForeignKey('user_has_roles', foreignKeyRole);
          }
    
          // Drop columns and table
          await queryRunner.dropColumn('user_has_roles', 'user_id');
          await queryRunner.dropColumn('user_has_roles', 'role_id');
          await queryRunner.dropTable('user_has_roles');
        }
      }
    }
