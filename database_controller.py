import sqlite3

class database():

    def __init__(self):
        self.conexao = sqlite3.connect('banco.db')        

    def createTable(self, table_data, table_name):
        c = self.conexao.cursor()

        sql_create_table = f'''
            CREATE TABLE IF NOT EXISTS {table_name} (
                {table_data}
            );'''
            
        c.execute(sql_create_table)
        self.conexao.commit()
        c.close()
    
    def addItem(self, table_data, item_table, table_name):
        c = self.conexao.cursor()

        sql_add_item = f'''
        INSERT INTO {table_name} ({item_table})
        VALUES ({table_data});
        '''
        c.execute(sql_add_item)
        self.conexao.commit()
        c.close()