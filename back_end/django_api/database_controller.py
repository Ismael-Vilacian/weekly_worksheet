import os
import sqlite3

class database:
    def __init__(self):
        db_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'banco.db')
        self.conexao = sqlite3.connect(db_path)

    def create_table(self, table_data, table_name):
        c = self.conexao.cursor()

        sql_create_table = f'''CREATE TABLE IF NOT EXISTS {table_name} ({table_data})'''

        c.execute(sql_create_table)
        self.conexao.commit()
        c.close()

    def add_item(self, table_data, item_table, table_name):
        c = self.conexao.cursor()

        sql_add_item = f'''INSERT INTO {table_name} ({item_table}) VALUES ({table_data})'''
        c.execute(sql_add_item)
        self.conexao.commit()
        c.close()

    def table_exists(self, table_name):
        c = self.conexao.cursor()

        c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table_name,))
        table = c.fetchone()

        c.close()

        return table is not None
    
    def custom_script(self, script):
        c = self.conexao.cursor()

        c.execute(script)
        self.conexao.commit()
        c.close()

    def get_data(self, table_name):
        c = self.conexao.cursor()

        c.execute(f'''SELECT * FROM {table_name};''')
        data = c.fetchall()

        c.close()

        return data
    
    def get_data_by_id(self, table_name, id):
        c = self.conexao.cursor()

        c.execute(f'''SELECT * FROM {table_name} WHERE id = {id};''')
        data = c.fetchall()

        c.close()

        return data

    def put_data(self, table_name, data):
        c = self.conexao.cursor()

        c.execute(f'''UPDATE {table_name} SET {data};''')
        self.conexao.commit()
        c.close()
    
    def delete_data(self, table_name, id):
        c = self.conexao.cursor()

        c.execute(f'''DELETE FROM {table_name} WHERE id = {id};''')
        self.conexao.commit()
        c.close()
