import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class InsertForeignKeys1630845667471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'ClientId_Fk',
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'FieldId_Fk',
            columnNames: ['field_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'fields',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
        
        await queryRunner.createForeignKey('fields', new TableForeignKey({
            name: 'ManagerId_Fk',
            columnNames: ['manager_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'ClientId_Fk');

        await queryRunner.dropColumn('appointments', 'client_id');

        await queryRunner.dropForeignKey('appointments', 'FieldId_Fk');

        await queryRunner.dropColumn('appointments', 'field_id');

        await queryRunner.dropForeignKey('fields', 'ManagerId_Fk');

        await queryRunner.dropColumn('fields', 'manager_id');
    }

}
