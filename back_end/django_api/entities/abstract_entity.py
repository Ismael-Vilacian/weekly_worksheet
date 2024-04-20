from abc import ABC, abstractmethod
from back_end.django_api.database_controller import database

class AbstractEntity(ABC):
    def __init__(self):
        self.database_controller = database()

    @abstractmethod
    def table_name(self):
        pass

    def create_table(self):
        properties_name = self.map_properties(True, True)
        self.database_controller.create_table(properties_name, self.table_name())

    def add_item(self):
        properties_name = self.map_properties()
        values_properties = self.map_values_properties()
        self.database_controller.add_item(values_properties, properties_name, self.table_name())

    def table_exists(self):
        return self.database_controller.table_exists(self.table_name())
    
    def map_properties(self, use_id=False, adjustment_types_bd=False):
        properties = ""
        for property, value in vars(self).items():

            if (use_id is False and property == 'id') or property in self.get_black_list():
                continue

            if adjustment_types_bd:
                if property == 'id':
                    type = 'INTEGER PRIMARY KEY AUTOINCREMENT'
                elif isinstance(value, int):
                    type = 'INTEGER'
                elif isinstance(value, float):
                    type = 'REAL'
                elif isinstance(value, str):
                    type = 'TEXT'
                else:
                    type = 'BLOB'
                properties += f"{property} {type}, "
            else:
                properties += f"{property}, "

        return properties[:-2]

    def map_values_properties(self, use_id=False):
        values = ""
        for property, value in vars(self).items():
            if (use_id is False and property == 'id') or property in self.get_black_list():
                continue

            if isinstance(value, str):
                values += f"'{value}', "
            else:
                values += f"{value}, "

        return values[:-2]
    
    def get_black_list(self):
        return ['especial variables', 'database_controller', 'table_name', 'create_table', 'add_item', 'table_exists', 'map_properties', 'map_values_properties', 'get_black_list']