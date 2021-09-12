import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class InsertForeignKeys1630845667471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'ProviderId_Fk',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'ProviderId_Fk');

        await queryRunner.dropColumn('appointments', 'provider_id');
    }

}
