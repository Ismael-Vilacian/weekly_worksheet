from abc import ABC, abstractmethod
from database_controller import database

class AbstractEntity(ABC):
    def __init__(self):
        self.database_controller = database()
        
        if not self.table_exists():
            self.create_table()

    @abstractmethod
    def table_name(self):
        pass

    def create_table(self):
        properties_name = self.map_properties(True)
        self.database_controller.create_table(properties_name, self.table_name())

    def add_item(self):
        properties_name = self.map_properties()
        values_properties = self.map_values_properties()
        self.database_controller.add_item(values_properties, properties_name, self.table_name())

    def table_exists(self):
        return self.database_controller.table_exists(self.table_name())
    
    def map_properties(self, use_id=False):
        properties = ""
        for property, value in vars(self).items():
            if use_id is False and property == 'id':
                continue
            properties += f"{property}, "

        return properties[:-2]

    def map_values_properties(self, use_id=False):
        values = ""
        for property, value in vars(self).items():
            if use_id is False and property == 'id':
                continue
            values += f"{value}, "

        return values[:-2]